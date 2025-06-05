import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { defineWidgetConfig, defineRouteConfig } from "@medusajs/admin-sdk";
import { Container, Alert, Heading, Text, Button, Select, Drawer, Label, Table, Badge, Input, toast, FocusModal, ProgressTabs, DropdownMenu, IconButton, clx, Prompt, Switch, Toaster } from "@medusajs/ui";
import React, { useState, useEffect, useMemo, createElement } from "react";
import { Grid2, CircularProgress } from "@mui/material";
import { Users, AcademicCap, LockClosedSolid, EllipsisHorizontal, Trash, Pencil } from "@medusajs/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
var PermissionType = /* @__PURE__ */ ((PermissionType2) => {
  PermissionType2["PREDEFINED"] = "predefined";
  PermissionType2["CUSTOM"] = "custom";
  return PermissionType2;
})(PermissionType || {});
var PermissionMatcherType = /* @__PURE__ */ ((PermissionMatcherType2) => {
  PermissionMatcherType2["API"] = "api";
  return PermissionMatcherType2;
})(PermissionMatcherType || {});
var PermissionActionType = /* @__PURE__ */ ((PermissionActionType2) => {
  PermissionActionType2["READ"] = "read";
  PermissionActionType2["WRITE"] = "write";
  PermissionActionType2["DELETE"] = "delete";
  return PermissionActionType2;
})(PermissionActionType || {});
var AdminRbacPolicyType = /* @__PURE__ */ ((AdminRbacPolicyType2) => {
  AdminRbacPolicyType2["DENY"] = "deny";
  AdminRbacPolicyType2["ALLOW"] = "allow";
  return AdminRbacPolicyType2;
})(AdminRbacPolicyType || {});
function getActionMessage(actionType) {
  switch (actionType) {
    case PermissionActionType.READ:
      return `read, so you cannot view the content`;
    case PermissionActionType.WRITE:
      return `write, so you are not able to create the content`;
    case PermissionActionType.DELETE:
      return `delete, so you are not able to delete the content`;
    default:
      return "unknown action";
  }
}
const ActionsList = ({ actionTypes }) => {
  return /* @__PURE__ */ jsx("ul", { children: actionTypes.map((actionType) => {
    return /* @__PURE__ */ jsx("li", { children: ` - ${getActionMessage(actionType)}` });
  }) });
};
const TestMyAuthorization = ({ urlToTest }) => {
  const [isLoading, setLoading] = useState(true);
  const [authorizationResult, setAuthorizationResult] = useState(void 0);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/check`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        urlToTest
      })
    }).then((res) => res.json()).then((responseJson) => {
      if (JSON.stringify(responseJson) === "{}") {
        setAuthorizationResult(void 0);
      } else {
        setAuthorizationResult(responseJson);
      }
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsx(Fragment, { children: !isLoading && authorizationResult && authorizationResult.denied.length > 0 && /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Alert, { variant: "error", children: [
    `You are unauthorized to:`,
    /* @__PURE__ */ jsx(ActionsList, { actionTypes: authorizationResult.denied })
  ] }) }) });
};
const CustomersUnAuthorized = () => {
  return /* @__PURE__ */ jsx(TestMyAuthorization, { urlToTest: "/admin/customers" });
};
defineWidgetConfig({
  zone: "customer.list.before"
});
const OrdersUnauthorized = () => {
  return /* @__PURE__ */ jsx(TestMyAuthorization, { urlToTest: "/admin/orders" });
};
defineWidgetConfig({
  zone: "order.list.before"
});
const PriceListsUnauthorized = () => {
  return /* @__PURE__ */ jsx(TestMyAuthorization, { urlToTest: "/admin/price-lists" });
};
defineWidgetConfig({
  zone: "price_list.list.before"
});
const ProductsUnauthorized = () => {
  return /* @__PURE__ */ jsx(TestMyAuthorization, { urlToTest: "/admin/products" });
};
defineWidgetConfig({
  zone: "product.list.before"
});
const DashboardMembersCard = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/members`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setMembers(result);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsxs(Grid2, { container: true, alignItems: "center", children: [
      /* @__PURE__ */ jsxs(Grid2, { children: [
        isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
        !isLoading && /* @__PURE__ */ jsxs(Heading, { children: [
          members.length,
          " ",
          members.length === 1 ? "member" : "members"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Grid2, { children: !isLoading && /* @__PURE__ */ jsx(Users, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Grid2, { children: [
      isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxs(Text, { children: [
        members.filter((member) => member.role !== void 0).length,
        " assigned"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Grid2, { children: [
      isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxs(Text, { children: [
        members.filter((member) => member.role === void 0).length,
        " unassigned"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
      Link,
      {
        to: `/rbac/members`,
        style: { display: "contents" },
        children: /* @__PURE__ */ jsx(Button, { children: "Configure" })
      }
    ) })
  ] }) });
};
const DashboardRolesCard = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/roles`, {
      credentials: "include"
    }).then((res) => res.json()).then((roles2) => {
      setRoles(roles2);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsxs(Grid2, { container: true, alignItems: "center", children: [
      /* @__PURE__ */ jsxs(Grid2, { children: [
        isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
        !isLoading && /* @__PURE__ */ jsxs(Heading, { children: [
          roles.length,
          " ",
          roles.length === 1 ? "role" : "roles"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Grid2, { children: !isLoading && /* @__PURE__ */ jsx(AcademicCap, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Grid2, { children: [
      isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxs(Text, { children: [
        roles.filter((role) => role.users !== void 0 && role.users.length > 0).length,
        " used"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Grid2, { children: [
      isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxs(Text, { children: [
        roles.filter((role) => role.users === void 0 || role.users.length === 0).length,
        " not used"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
      Link,
      {
        to: `/rbac/roles`,
        style: { display: "contents" },
        children: /* @__PURE__ */ jsx(Button, { children: "Configure" })
      }
    ) })
  ] }) });
};
const AssignedRolesList = ({ sortedRoles }) => {
  return /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 2, children: [
    sortedRoles.map((sortedRole) => {
      return /* @__PURE__ */ jsxs(Grid2, { container: true, columnSpacing: 1, alignItems: "center", justifyContent: "space-between", children: [
        /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: sortedRole.name }) }),
        /* @__PURE__ */ jsxs(Grid2, { container: true, columnSpacing: 1, alignItems: "center", children: [
          /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: sortedRole.users.length }) }),
          /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Users, {}) })
        ] })
      ] }, sortedRole.id);
    }),
    sortedRoles.length === 0 && /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: `-` }) })
  ] });
};
const DashboardAssignedRolesCard = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/roles`, {
      credentials: "include"
    }).then((res) => res.json()).then((roles2) => {
      const sorted = roles2.sort((a, b) => b.users.length - a.users.length);
      setRoles(sorted);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsxs(Grid2, { children: [
      isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsx(Heading, { children: `Most used roles` })
    ] }),
    /* @__PURE__ */ jsxs(Grid2, { children: [
      isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsx(AssignedRolesList, { sortedRoles: roles })
    ] })
  ] }) });
};
const DashboardPermissionsCard = () => {
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/permissions`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setPermissions(result);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsxs(Grid2, { container: true, alignItems: "center", children: [
      /* @__PURE__ */ jsxs(Grid2, { children: [
        isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
        !isLoading && /* @__PURE__ */ jsxs(Heading, { children: [
          permissions.length,
          " ",
          permissions.length === 1 ? "permission" : "permissions"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Grid2, { children: !isLoading && /* @__PURE__ */ jsx(LockClosedSolid, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Grid2, { children: [
      isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxs(Text, { children: [
        permissions.filter((perm) => perm.type == PermissionType.PREDEFINED).length,
        " predefined"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Grid2, { children: [
      isLoading && /* @__PURE__ */ jsx(CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxs(Text, { children: [
        permissions.filter((perm) => perm.type == PermissionType.CUSTOM).length,
        " custom"
      ] })
    ] }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
      Link,
      {
        to: `/rbac/permissions`,
        style: { display: "contents" },
        children: /* @__PURE__ */ jsx(Button, { children: "Configure" })
      }
    ) })
  ] }) });
};
const Dashboard = () => {
  return /* @__PURE__ */ jsxs(Grid2, { container: true, rowSpacing: 10, columnSpacing: 10, style: { marginTop: 15 }, children: [
    /* @__PURE__ */ jsx(Grid2, { size: 4, children: /* @__PURE__ */ jsx(DashboardPermissionsCard, {}) }),
    /* @__PURE__ */ jsx(Grid2, { size: 4, children: /* @__PURE__ */ jsx(DashboardRolesCard, {}) }),
    /* @__PURE__ */ jsx(Grid2, { size: 4, children: /* @__PURE__ */ jsx(DashboardMembersCard, {}) }),
    /* @__PURE__ */ jsx(Grid2, { size: 4, children: /* @__PURE__ */ jsx(DashboardAssignedRolesCard, {}) })
  ] });
};
const RbacAuthorizationCheck = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [authorizationResult, setAuthorizationResult] = useState(void 0);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/check`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        urlToTest: `/admin/rbac`
      })
    }).then((res) => res.json()).then((responseJson) => {
      setAuthorizationResult(responseJson);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(CircularProgress, { size: 12 });
  }
  if (authorizationResult.denied.length > 0) {
    return /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Alert, { variant: "error", children: "You are unauthorized to manage RBAC" }) });
  }
  return /* @__PURE__ */ jsx("div", { children });
};
const RbacLicenceCheck = ({ children }) => {
  const [licenceStatus, setLicenceStatus] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/licence`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setLicenceStatus(result.licence);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(CircularProgress, { size: 12 });
  }
  if (licenceStatus == void 0) {
    return /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Alert, { variant: "error", children: "Cannot get licence status" }) });
  }
  switch (licenceStatus) {
    case "EXPIRED":
      return /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Alert, { variant: "error", children: "Licence is expired" }) });
    case "INVALID":
      return /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Alert, { variant: "error", children: "Licence is invalid" }) });
  }
  if (licenceStatus !== "VALID") {
    return /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Alert, { variant: "error", children: "Licence is in unknown state. Please contact us." }) });
  }
  return /* @__PURE__ */ jsx("div", { children });
};
const MainPage = () => {
  return /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "RBAC system" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Dashboard, {}) })
  ] });
};
const RbacPage = () => {
  return /* @__PURE__ */ jsx(RbacLicenceCheck, { children: /* @__PURE__ */ jsx(RbacAuthorizationCheck, { children: /* @__PURE__ */ jsx(MainPage, {}) }) });
};
const config$3 = defineRouteConfig({
  label: "RBAC",
  icon: Users
});
const SelectRole = ({ currentRole, roles, setChosenRole }) => {
  const [value, setValue] = useState(currentRole ? currentRole.id : void 0);
  const handleChange = (roleId) => {
    setValue(roleId);
    setChosenRole(roles.find((role) => role.id == roleId));
  };
  return /* @__PURE__ */ jsx("div", { className: "w-[256px]", children: /* @__PURE__ */ jsxs(Select, { onValueChange: handleChange, value, children: [
    /* @__PURE__ */ jsx(Select.Trigger, { children: /* @__PURE__ */ jsx(Select.Value, { placeholder: "Select a role" }) }),
    /* @__PURE__ */ jsx(Select.Content, { children: roles && roles.map((item) => /* @__PURE__ */ jsx(Select.Item, { value: item.id, children: `${item.name}` }, item.id)) })
  ] }) });
};
const AvailableRolesList = ({ currentRole, setChosenRole }) => {
  const [isLoading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/roles`, {
      credentials: "include"
    }).then((res) => res.json()).then((roles2) => {
      setRoles(roles2);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isLoading && /* @__PURE__ */ jsx(CircularProgress, {}),
    !isLoading && /* @__PURE__ */ jsx(SelectRole, { currentRole, roles, setChosenRole })
  ] });
};
const DrawerEditUser = ({ currentRole, setRole }) => {
  const [chosenRole, setChosenRole] = useState(currentRole);
  const [drawerIsOpen, setDrawerIsOpen] = useState(void 0);
  return /* @__PURE__ */ jsxs(Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: [
    /* @__PURE__ */ jsx(Drawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: `Assign` }) }),
    /* @__PURE__ */ jsxs(Drawer.Content, { children: [
      /* @__PURE__ */ jsx(Drawer.Header, { children: /* @__PURE__ */ jsx(Drawer.Title, { children: "Select role" }) }),
      /* @__PURE__ */ jsx(Drawer.Body, { className: "p-4", children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", columnSpacing: 10, rowSpacing: 3, children: [
        /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Label, { children: "Choose role" }) }),
        /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(AvailableRolesList, { currentRole, setChosenRole }) })
      ] }) }),
      /* @__PURE__ */ jsxs(Drawer.Footer, { children: [
        /* @__PURE__ */ jsx(Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Cancel" }) }),
        /* @__PURE__ */ jsx(Button, { onClick: () => {
          setRole(chosenRole);
          setDrawerIsOpen(false);
        }, children: "Save" })
      ] })
    ] })
  ] });
};
const RoleBadge = ({ role }) => {
  if (role) {
    return /* @__PURE__ */ jsx(Badge, { size: "small", color: "green", children: role.name });
  }
  return /* @__PURE__ */ jsx(Badge, { size: "small", children: "Unassigned" });
};
function MembersTable() {
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const assignRole = (roleId, userId) => {
    fetch(`/admin/rbac/members/assignments`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        roleId
      })
    }).then((res) => res.json()).then(({ message }) => {
      setLoading(true);
      if (message) {
        throw message;
      }
    }).catch((e) => {
      setLoading(true);
      console.error(e);
    });
  };
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/members`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setMembers(result);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;
  const pageCount = Math.ceil(members.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);
  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };
  const currentMembers = useMemo(() => {
    if (isLoading) {
      return [];
    }
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, members.length);
    return members.slice(offset, limit);
  }, [currentPage, pageSize, members, isLoading]);
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-1 flex-col", children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Name" }),
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Email" }),
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Role" }),
        /* @__PURE__ */ jsx(Table.HeaderCell, {})
      ] }) }),
      /* @__PURE__ */ jsx(Table.Body, { children: currentMembers.map((member) => {
        const name = member.user.first_name !== null && member.user.last_name !== null ? `${member.user.first_name} ${member.user.last_name}` : "-";
        return /* @__PURE__ */ jsxs(
          Table.Row,
          {
            className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(Table.Cell, { children: name }),
              /* @__PURE__ */ jsx(Table.Cell, { children: member.user.email }),
              /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(RoleBadge, { role: member.role }) }),
              /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(DrawerEditUser, { currentRole: member.role, setRole: (role) => assignRole(role.id, member.user.id) }) })
            ]
          },
          member.user.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx(
      Table.Pagination,
      {
        count: members.length,
        pageSize,
        pageIndex: currentPage,
        pageCount,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage
      }
    )
  ] });
}
const MembersTable$1 = React.memo(MembersTable);
const MembersPage = () => {
  return /* @__PURE__ */ jsx(RbacLicenceCheck, { children: /* @__PURE__ */ jsx(RbacAuthorizationCheck, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Members" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(MembersTable$1, {}) }) })
  ] }) }) });
};
const config$2 = defineRouteConfig({
  label: "Members"
});
const InputCreateCategory = ({ category, setCategory }) => {
  const [error, setError] = useState(void 0);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Input,
      {
        value: category,
        onChange: (e) => setCategory(e.target.value),
        "aria-invalid": error !== void 0
      }
    ),
    error !== void 0 && /* @__PURE__ */ jsx(Alert, { variant: "error", children: error })
  ] });
};
const DrawerCreateCategory = ({ reload }) => {
  const [categoryName, setCategoryName] = useState(void 0);
  const [drawerIsOpen, setDrawerIsOpen] = useState(void 0);
  const onSubmit = () => {
    fetch(`/admin/rbac/categories`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: categoryName
      })
    }).then(async (response) => {
      if (response.ok) {
        reload();
        toast.info("New category has been created", {
          description: "You can now select it from the list."
        });
      } else {
        const error = await response.json();
        toast.error("Error", {
          description: `New category cannot be created. ${error.message}`
        });
      }
    }).catch((e) => {
      toast.error("Error", {
        description: `New category cannot be created. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxs(Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: [
    /* @__PURE__ */ jsx(Drawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: `Create` }) }),
    /* @__PURE__ */ jsxs(Drawer.Content, { children: [
      /* @__PURE__ */ jsx(Drawer.Header, { children: /* @__PURE__ */ jsx(Drawer.Title, { children: "New category" }) }),
      /* @__PURE__ */ jsx(Drawer.Body, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", columnSpacing: 10, rowSpacing: 3, children: [
        /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Label, { children: "Name" }) }),
        /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(InputCreateCategory, { setCategory: setCategoryName }) })
      ] }) }),
      /* @__PURE__ */ jsxs(Drawer.Footer, { children: [
        /* @__PURE__ */ jsx(Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Cancel" }) }),
        /* @__PURE__ */ jsx(Button, { onClick: () => {
          onSubmit();
          reload();
          setDrawerIsOpen(false);
        }, children: "Save" })
      ] })
    ] })
  ] });
};
const SelectCategory = ({ currentCategory, setChosenCategory }) => {
  const [value, setValue] = useState(void 0);
  const [categories, setCategories] = useState([]);
  const handleChange = (categoryId) => {
    if (categoryId !== "None") {
      setValue(categories.find((cat) => cat.id == categoryId));
      setChosenCategory(categories.find((cat) => cat.id == categoryId));
    } else {
      setValue(void 0);
      setChosenCategory("None");
    }
  };
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/categories`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setCategories(result);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 2, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsxs(Select, { onValueChange: handleChange, value: value ? value.id : "None", children: [
      /* @__PURE__ */ jsx(Select.Trigger, { children: /* @__PURE__ */ jsx(Select.Value, { placeholder: "Select a category" }) }),
      isLoading && /* @__PURE__ */ jsx(CircularProgress, {}),
      !isLoading && /* @__PURE__ */ jsxs(Select.Content, { children: [
        /* @__PURE__ */ jsx(Select.Item, { value: "None", children: `None` }, "None"),
        /* @__PURE__ */ jsx(Select.Separator, {}),
        categories && categories.map((item) => /* @__PURE__ */ jsx(Select.Item, { value: item.id, children: `${item.name}` }, item.id))
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Label, { size: "small", children: "You can create new category" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(DrawerCreateCategory, { reload: () => setLoading(true) }) })
  ] });
};
const validateName$2 = (value) => {
  if (value && value.length > 0) {
    return true;
  }
  return false;
};
const CreatePermissionGeneralStep = ({ register, errors, setCategory, currentCategory }) => {
  return /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Grid2, { size: 4, children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Create permission" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: "Set a name which will describe permission" }) }),
    /* @__PURE__ */ jsx(Grid2, { container: true, children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsx(Grid2, { marginTop: 4, children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Name" }) }),
      /* @__PURE__ */ jsxs(Grid2, { children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Reading products",
            ...register("name", {
              validateName: validateName$2
            }),
            "aria-invalid": errors["name"] !== void 0
          }
        ),
        errors["name"] !== void 0 && /* @__PURE__ */ jsx(Alert, { variant: "error", children: errors["name"].message })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx(Grid2, { container: true, children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 1, children: [
      /* @__PURE__ */ jsx(Grid2, { marginTop: 4, children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Category (optional)" }) }),
      /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(SelectCategory, { currentCategory, setChosenCategory: setCategory }) })
    ] }) }) })
  ] }) }) });
};
const SelectMatcherType = ({ currentMatcherType, matcherTypes, setChosenMatcherType }) => {
  const [value, setValue] = useState(currentMatcherType);
  const handleChange = (matcherType) => {
    setValue(matcherType);
    setChosenMatcherType(matcherType);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-[256px]", children: /* @__PURE__ */ jsxs(Select, { onValueChange: handleChange, value, children: [
    /* @__PURE__ */ jsx(Select.Trigger, { children: /* @__PURE__ */ jsx(Select.Value, { placeholder: "Select a matcher type" }) }),
    /* @__PURE__ */ jsx(Select.Content, { children: matcherTypes && matcherTypes.map((item) => /* @__PURE__ */ jsx(Select.Item, { value: item, children: `${item}` }, item)) })
  ] }) });
};
const SelectActionType = ({ currentActionType, actionTypes, setChosenActionType }) => {
  const [value, setValue] = useState(currentActionType);
  const handleChange = (actionType) => {
    setValue(actionType);
    setChosenActionType(actionType);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-[256px]", children: /* @__PURE__ */ jsxs(Select, { onValueChange: handleChange, value, children: [
    /* @__PURE__ */ jsx(Select.Trigger, { children: /* @__PURE__ */ jsx(Select.Value, { placeholder: "Select an action type" }) }),
    /* @__PURE__ */ jsx(Select.Content, { children: actionTypes && actionTypes.map((item) => /* @__PURE__ */ jsx(Select.Item, { value: item, children: `${item}` }, item)) })
  ] }) });
};
const validateName$1 = (value) => {
  if (value && value.length > 0) {
    return true;
  }
  return false;
};
const InputMatcher = ({ register, errors }) => {
  return /* @__PURE__ */ jsx(Grid2, { container: true, direction: "column", spacing: 1, children: /* @__PURE__ */ jsx(Grid2, { container: true, children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 1, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Matcher" }) }),
    /* @__PURE__ */ jsxs(Grid2, { children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "/admin/products",
          ...register("matcher", {
            validateName: validateName$1
          }),
          "aria-invalid": errors["matcher"] !== void 0
        }
      ),
      errors["matcher"] !== void 0 && /* @__PURE__ */ jsx(Alert, { variant: "error", children: errors["matcher"].message })
    ] })
  ] }) }) }) });
};
const CreatePermissionConfigurationStep = ({ register, errors, currentMatcherType, currentActionType, setMatcherType, setActionType }) => {
  return /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Grid2, { size: 4, children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Configure permission" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Choose matcher type" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(SelectMatcherType, { currentMatcherType, matcherTypes: [PermissionMatcherType.API], setChosenMatcherType: setMatcherType }) }),
    errors["matcherType"] !== void 0 && /* @__PURE__ */ jsx(Alert, { variant: "error", children: errors["matcherType"].message }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Choose action type" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(SelectActionType, { currentActionType, actionTypes: Object.values(PermissionActionType), setChosenActionType: setActionType }) }),
    errors["actionType"] !== void 0 && /* @__PURE__ */ jsx(Alert, { variant: "error", children: errors["actionType"].message }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(InputMatcher, { register, errors }) })
  ] }) }) });
};
const tabOrder$1 = [
  "general",
  "configuration"
  /* CONFIGURATION */
];
const initialTabState$1 = {
  [
    "general"
    /* GENERAL */
  ]: "in-progress",
  [
    "configuration"
    /* CONFIGURATION */
  ]: "not-started"
};
const PrimaryButton$1 = ({ tab, next, isLoading, handleSubmit }) => {
  if (tab === "general") {
    return /* @__PURE__ */ jsx(Button, { onClick: () => next(tab), children: "Continue" });
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: "submit",
      isLoading,
      onClick: handleSubmit,
      children: "Create"
    },
    "submit-button"
  );
};
const CreatePermissionModal = ({ reloadTable }) => {
  const { register, handleSubmit, formState: { errors }, getValues, setError, clearErrors, reset } = useForm({
    defaultValues: {
      name: "",
      matcher: ""
    }
  });
  const [activeTab, setActiveTab] = useState(
    "general"
    /* GENERAL */
  );
  const [tabState, setTabState] = useState(initialTabState$1);
  const [isOpen, setIsOpen] = useState(false);
  const [matcherType, setMatcherType] = useState(void 0);
  const [actionType, setActionType] = useState(void 0);
  const [category, setCategory] = useState(void 0);
  const partialFormValidation = (tab) => {
    let result = true;
    switch (tab) {
      case "general":
        if (getValues("name") && getValues.length > 0) {
          clearErrors("name");
        } else {
          setError("name", { type: "custom", message: "Please fill the name" });
          result = false;
        }
        return result;
      case "configuration":
        if (getValues("matcher") && getValues.length > 0) {
          clearErrors("matcher");
        } else {
          setError("matcher", { type: "custom", message: "Please fill the matcher" });
          result = false;
        }
        if (matcherType) {
          clearErrors("matcherType");
        } else {
          setError("matcherType", { type: "custom", message: "Please fill the matcher type" });
          result = false;
        }
        if (actionType) {
          clearErrors("actionType");
        } else {
          setError("actionType", { type: "custom", message: "Please fill the action type" });
          result = false;
        }
        return result;
      default:
        return false;
    }
  };
  useEffect(() => {
    if (!isOpen) {
      reset();
      setActiveTab(
        "general"
        /* GENERAL */
      );
      setMatcherType(void 0);
      setActionType(void 0);
      setCategory(void 0);
      setTabState(initialTabState$1);
    }
  }, [isOpen]);
  const isTabDirty = (tab) => {
    return partialFormValidation(tab);
  };
  const onSubmit = (data) => {
    fetch(`/admin/rbac/permissions`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        type: PermissionType.CUSTOM,
        matcherType,
        matcher: data.matcher,
        actionType,
        category
      })
    }).then(async (response) => {
      if (response.ok) {
        toast.info("Permission", {
          description: "New permission has been created"
        });
        reloadTable();
        setIsOpen(false);
      } else {
        const error = await response.json();
        toast.error("Permission", {
          description: `New permission cannot be created. ${error.message}`
        });
      }
    }).catch((e) => {
      toast.error("Permission", {
        description: `New permission cannot be created. ${e.toString()}`
      });
      console.error(e);
    });
  };
  function handleChangeTab(newTab) {
    if (activeTab === newTab) {
      return;
    }
    if (tabOrder$1.indexOf(newTab) < tabOrder$1.indexOf(activeTab)) {
      const isCurrentTabDirty = isTabDirty(activeTab);
      setTabState((prev) => ({
        ...prev,
        [activeTab]: isCurrentTabDirty ? prev[activeTab] : "not-started",
        [newTab]: "in-progress"
      }));
      setActiveTab(newTab);
      return;
    }
    const tabs = tabOrder$1.slice(0, tabOrder$1.indexOf(newTab));
    for (const tab of tabs) {
      if (tab === "general") {
        if (!partialFormValidation(tab)) {
          setTabState((prev) => ({
            ...prev,
            [tab]: "in-progress"
          }));
          setActiveTab(tab);
          return;
        }
        setTabState((prev) => ({
          ...prev,
          [tab]: "completed"
        }));
      } else if (tab === "configuration") {
        if (!partialFormValidation(tab)) {
          setTabState((prev) => ({
            ...prev,
            [tab]: "in-progress"
          }));
          setActiveTab(tab);
          return;
        }
        setTabState((prev) => ({
          ...prev,
          [tab]: "completed"
        }));
      }
    }
    setTabState((prev) => ({
      ...prev,
      [activeTab]: "completed",
      [newTab]: "in-progress"
    }));
    setActiveTab(newTab);
  }
  const handleNextTab = (tab) => {
    if (tabOrder$1.indexOf(tab) + 1 >= tabOrder$1.length) {
      return;
    }
    const nextTab = tabOrder$1[tabOrder$1.indexOf(tab) + 1];
    handleChangeTab(nextTab);
  };
  return /* @__PURE__ */ jsxs(FocusModal, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(FocusModal.Trigger, { children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Create" }) }),
    /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsx(FocusModal.Content, { children: /* @__PURE__ */ jsxs(
      ProgressTabs,
      {
        value: activeTab,
        onValueChange: (tab) => handleChangeTab(tab),
        className: "flex h-full flex-col overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(FocusModal.Header, { children: /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-between gap-x-4", children: /* @__PURE__ */ jsx("div", { className: "-my-2 w-full max-w-[600px] border-l", children: /* @__PURE__ */ jsxs(ProgressTabs.List, { children: [
            /* @__PURE__ */ jsx(
              ProgressTabs.Trigger,
              {
                value: "general",
                status: tabState.general,
                children: "General"
              }
            ),
            /* @__PURE__ */ jsx(
              ProgressTabs.Trigger,
              {
                value: "configuration",
                status: tabState.configuration,
                children: "Configuration"
              }
            )
          ] }) }) }) }),
          /* @__PURE__ */ jsxs(FocusModal.Body, { className: "size-full overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              ProgressTabs.Content,
              {
                className: "size-full overflow-y-auto",
                value: "general",
                children: /* @__PURE__ */ jsx(CreatePermissionGeneralStep, { register, errors, setCategory, currentCategory: category })
              }
            ),
            /* @__PURE__ */ jsx(
              ProgressTabs.Content,
              {
                className: "size-full overflow-y-auto",
                value: "configuration",
                children: /* @__PURE__ */ jsx(
                  CreatePermissionConfigurationStep,
                  {
                    currentMatcherType: matcherType,
                    currentActionType: actionType,
                    register,
                    errors,
                    setActionType,
                    setMatcherType
                  }
                )
              }
            )
          ] }),
          /* @__PURE__ */ jsx(FocusModal.Footer, { children: /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, columnSpacing: 2, rowSpacing: 5, children: [
            /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(FocusModal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Cancel" }) }) }),
            /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
              PrimaryButton$1,
              {
                tab: activeTab,
                next: handleNextTab,
                isLoading: false,
                handleSubmit: () => {
                  if (partialFormValidation(activeTab)) {
                    return handleSubmit(onSubmit)();
                  }
                }
              }
            ) })
          ] }) }) }) })
        ]
      }
    ) }) })
  ] });
};
const ActionMenu = ({ groups }) => {
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenu.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(IconButton, { size: "small", variant: "transparent", children: /* @__PURE__ */ jsx(EllipsisHorizontal, {}) }) }),
    /* @__PURE__ */ jsx(DropdownMenu.Content, { children: groups.map((group, index) => {
      if (!group.actions.length) {
        return null;
      }
      const isLast = index === groups.length - 1;
      return /* @__PURE__ */ jsxs(DropdownMenu.Group, { children: [
        group.actions.map((action, index2) => {
          if (action.onClick) {
            return /* @__PURE__ */ jsxs(
              DropdownMenu.Item,
              {
                disabled: action.disabled,
                onClick: (e) => {
                  e.stopPropagation();
                  action.onClick();
                },
                className: clx(
                  "[&_svg]:text-ui-fg-subtle flex items-center gap-x-2",
                  {
                    "[&_svg]:text-ui-fg-disabled": action.disabled
                  }
                ),
                children: [
                  action.icon,
                  /* @__PURE__ */ jsx("span", { children: action.label })
                ]
              },
              index2
            );
          }
          return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            DropdownMenu.Item,
            {
              className: clx(
                "[&_svg]:text-ui-fg-subtle flex items-center gap-x-2",
                {
                  "[&_svg]:text-ui-fg-disabled": action.disabled
                }
              ),
              asChild: true,
              disabled: action.disabled,
              children: /* @__PURE__ */ jsxs(Link, { to: action.to, onClick: (e) => e.stopPropagation(), children: [
                action.icon,
                /* @__PURE__ */ jsx("span", { children: action.label })
              ] })
            }
          ) }, index2);
        }),
        !isLast && /* @__PURE__ */ jsx(DropdownMenu.Separator, {})
      ] }, index);
    }) })
  ] });
};
const Header = ({
  title,
  subtitle,
  actions = []
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Heading, { level: "h2", children: title }),
      subtitle && /* @__PURE__ */ jsx(Text, { className: "text-ui-fg-subtle", size: "small", children: subtitle })
    ] }),
    actions.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-x-2", children: actions.map((action, index) => /* @__PURE__ */ jsxs(Fragment, { children: [
      action.type === "button" && /* @__PURE__ */ createElement(
        Button,
        {
          ...action.props,
          size: action.props.size || "small",
          key: index
        },
        /* @__PURE__ */ jsxs(Fragment, { children: [
          action.props.children,
          action.link && /* @__PURE__ */ jsx(Link, { ...action.link })
        ] })
      ),
      action.type === "action-menu" && /* @__PURE__ */ jsx(ActionMenu, { ...action.props }),
      action.type === "custom" && action.children
    ] })) })
  ] });
};
const DeletePermission = ({ permissionId, reloadTable }) => {
  const handleAction = () => {
    fetch(`/admin/rbac/permissions`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: permissionId
      })
    }).then((res) => res.json()).then(({ message }) => {
      reloadTable();
      if (message) {
        throw message;
      }
    }).catch((e) => {
      reloadTable();
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxs(Prompt, { children: [
    /* @__PURE__ */ jsx(Prompt.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(Trash, {}) }) }),
    /* @__PURE__ */ jsxs(Prompt.Content, { children: [
      /* @__PURE__ */ jsxs(Prompt.Header, { children: [
        /* @__PURE__ */ jsx(Prompt.Title, { children: "Delete role" }),
        /* @__PURE__ */ jsx(Prompt.Description, { children: "Are you sure? This cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxs(Prompt.Footer, { children: [
        /* @__PURE__ */ jsx(Prompt.Cancel, { onClick: (e) => e.stopPropagation(), children: "Cancel" }),
        /* @__PURE__ */ jsx(Prompt.Action, { onClick: (e) => {
          e.stopPropagation();
          handleAction();
        }, children: "Delete" })
      ] })
    ] })
  ] });
};
const PermissionsTable$1 = ({ permissions, permissionType, reloadTable }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const pageCount = Math.ceil(permissions.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);
  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };
  const currentPermissions = useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, permissions.length);
    return permissions.slice(offset, limit);
  }, [currentPage, pageSize, permissions]);
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/rbac/permissions/${id}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-1 flex-col", children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Target" }),
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Action" }),
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Type" }),
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Name" }),
        permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsx(Table.HeaderCell, {})
      ] }) }),
      /* @__PURE__ */ jsx(Table.Body, { children: currentPermissions.map((permission) => {
        return /* @__PURE__ */ jsxs(
          Table.Row,
          {
            onClick: permissionType === PermissionType.CUSTOM ? () => handleRowClick(permission.id) : void 0,
            style: permissionType === PermissionType.CUSTOM ? { cursor: "pointer" } : {},
            className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(Table.Cell, { style: { alignContent: "center" }, children: `${permission.matcher}` }),
              /* @__PURE__ */ jsx(Table.Cell, { style: { alignContent: "center" }, children: `${permission.actionType.toUpperCase()}` }),
              /* @__PURE__ */ jsx(Table.Cell, { style: { alignContent: "center" }, children: permission.matcherType }),
              /* @__PURE__ */ jsx(Table.Cell, { style: { alignContent: "center" }, children: `${permission.name}` }),
              permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsx(Table.Cell, { style: { alignContent: "center" }, children: /* @__PURE__ */ jsx(Grid2, { container: true, spacing: 2, children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
                DeletePermission,
                {
                  permissionId: permission.id,
                  reloadTable
                }
              ) }) }) })
            ]
          },
          permission.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx(
      Table.Pagination,
      {
        count: permissions.length,
        pageSize,
        pageIndex: currentPage,
        pageCount,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage
      }
    )
  ] });
};
const PermissionTable = React.memo(PermissionsTable$1);
const DeleteCategory = ({ category, reloadTable }) => {
  const handleAction = () => {
    fetch(`/admin/rbac/categories`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: category.id
      })
    }).then((res) => res.json()).then(({ message }) => {
      reloadTable();
      if (message) {
        throw message;
      }
    }).catch((e) => {
      reloadTable();
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxs(Prompt, { children: [
    /* @__PURE__ */ jsx(Prompt.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(Trash, {}) }) }),
    /* @__PURE__ */ jsxs(Prompt.Content, { children: [
      /* @__PURE__ */ jsxs(Prompt.Header, { children: [
        category.permissions.length > 0 && /* @__PURE__ */ jsx(Prompt.Title, { children: "Delete category with permissions" }),
        category.permissions.length === 0 && /* @__PURE__ */ jsx(Prompt.Title, { children: "Delete empty category" }),
        category.permissions.length > 0 && /* @__PURE__ */ jsx(Prompt.Description, { children: `Are you sure? This category contains ${category.permissions.length} permissions - they will be deleted also! This cannot be undone.` }),
        category.permissions.length === 0 && /* @__PURE__ */ jsx(Prompt.Description, { children: "Are you sure? This cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxs(Prompt.Footer, { children: [
        /* @__PURE__ */ jsx(Prompt.Cancel, { onClick: (e) => e.stopPropagation(), children: "Cancel" }),
        /* @__PURE__ */ jsx(Prompt.Action, { onClick: (e) => {
          e.stopPropagation();
          handleAction();
        }, children: "Delete" })
      ] })
    ] })
  ] });
};
const PermissionCategoryTable = ({ categories, permissionType, reloadTable }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const pageCountCategory = Math.ceil(categories.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCountCategory - 1,
    [currentPage, pageCountCategory]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);
  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };
  const currentCategories = useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, categories.length);
    return categories.slice(offset, limit);
  }, [currentPage, pageSize, categories]);
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-1 flex-col", children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Category" }),
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Permissions" }),
        permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsx(Table.HeaderCell, {})
      ] }) }),
      /* @__PURE__ */ jsx(Table.Body, { children: currentCategories.map((category) => {
        return /* @__PURE__ */ jsxs(
          Table.Row,
          {
            className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsx(Table.Cell, { children: `${category ? category.name : "-"}` }),
              /* @__PURE__ */ jsx(Table.Cell, { children: `${category.permissions.length}` }),
              permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Grid2, { container: true, spacing: 2, children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
                DeleteCategory,
                {
                  category,
                  reloadTable
                }
              ) }) }) })
            ]
          },
          category ? category.id : "-"
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx(
      Table.Pagination,
      {
        count: categories.length,
        pageSize,
        pageIndex: currentPage,
        pageCount: pageCountCategory,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage
      }
    )
  ] });
};
const PermissionCategoryTable$1 = React.memo(PermissionCategoryTable);
const PermissionsCustomArea = () => {
  const [permissions, setPermissions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingCategories, setLoadingCategories] = useState(true);
  function reloadTable() {
    setLoading(true);
    setLoadingCategories(true);
  }
  const params = new URLSearchParams({
    type: PermissionType.CUSTOM
  });
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/permissions?${params.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((permissions2) => {
      setPermissions(permissions2);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  useEffect(() => {
    if (!isLoadingCategories) {
      return;
    }
    fetch(`/admin/rbac/categories?${params.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((categories2) => {
      setCategories(categories2);
      setLoadingCategories(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoadingCategories]);
  const [viewType, setViewType] = useState(
    "permission"
    /* PERMISSION */
  );
  return /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
      Header,
      {
        title: `Custom`,
        actions: [
          {
            type: "custom",
            children: /* @__PURE__ */ jsxs(Grid2, { container: true, paddingRight: 5, spacing: 2, children: [
              /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: viewType === "category" ? "Category view" : "Permission view" }) }),
              /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Switch, {
                onCheckedChange: (checked) => setViewType(
                  checked ? "category" : "permission"
                  /* PERMISSION */
                ),
                checked: viewType === "category"
                /* CATEGORY */
              }) })
            ] })
          },
          {
            type: "custom",
            children: /* @__PURE__ */ jsx(CreatePermissionModal, { reloadTable })
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Grid2, { children: viewType === "permission" ? /* @__PURE__ */ jsx(PermissionTable, { permissions, permissionType: PermissionType.CUSTOM, reloadTable }) : /* @__PURE__ */ jsx(PermissionCategoryTable$1, { categories, permissionType: PermissionType.CUSTOM, reloadTable }) })
  ] });
};
const PermissionsPredefinedArea = () => {
  const [permissions, setPermissions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingCategories, setLoadingCategories] = useState(true);
  function reloadTable() {
    setLoading(true);
    setLoadingCategories(true);
  }
  const params = new URLSearchParams({
    type: PermissionType.PREDEFINED
  });
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/permissions?${params.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((permissions2) => {
      setPermissions(permissions2);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/categories?${params.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((categories2) => {
      setCategories(categories2);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoadingCategories]);
  const [viewType, setViewType] = useState(
    "permission"
    /* PERMISSION */
  );
  return /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
      Header,
      {
        title: `Predefined`,
        actions: [
          {
            type: "custom",
            children: /* @__PURE__ */ jsxs(Grid2, { container: true, paddingRight: 5, spacing: 2, children: [
              /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: viewType === "category" ? "Category view" : "Permission view" }) }),
              /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Switch, {
                onCheckedChange: (checked) => setViewType(
                  checked ? "category" : "permission"
                  /* PERMISSION */
                ),
                checked: viewType === "category"
                /* CATEGORY */
              }) })
            ] })
          }
        ]
      }
    ) }),
    isLoading && /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(CircularProgress, {}) }),
    !isLoading && /* @__PURE__ */ jsx(Grid2, { children: viewType === "permission" ? /* @__PURE__ */ jsx(PermissionTable, { permissions, permissionType: PermissionType.PREDEFINED, reloadTable }) : /* @__PURE__ */ jsx(PermissionCategoryTable$1, { categories, permissionType: PermissionType.PREDEFINED, reloadTable }) })
  ] });
};
function PermissionsList({ permissionType }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    permissionType === PermissionType.PREDEFINED && /* @__PURE__ */ jsx(PermissionsPredefinedArea, {}),
    permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsx(PermissionsCustomArea, {})
  ] });
}
const PermissionsTable = React.memo(PermissionsList);
const PermissionsPage = () => {
  return /* @__PURE__ */ jsx(RbacLicenceCheck, { children: /* @__PURE__ */ jsx(RbacAuthorizationCheck, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Permissions" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Container, { style: { marginTop: 15 }, children: /* @__PURE__ */ jsx(PermissionsTable, { permissionType: PermissionType.CUSTOM }) }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(PermissionsTable, { permissionType: PermissionType.PREDEFINED }) }) })
  ] }) }) });
};
const config$1 = defineRouteConfig({
  label: "Permissions"
});
const validateName = (value) => {
  if (value && value.length > 0) {
    return true;
  }
  return false;
};
const EditRoleStep = ({ register, errors }) => {
  return /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Grid2, { size: 4, children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Create role" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: "Set a name which will describe what is a role" }) }),
    /* @__PURE__ */ jsx(Grid2, { container: true, children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsx(Grid2, { marginTop: 4, children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Name" }) }),
      /* @__PURE__ */ jsxs(Grid2, { children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Store administrator",
            ...register("name", {
              validateName
            }),
            "aria-invalid": errors["name"] !== void 0
          }
        ),
        errors["name"] !== void 0 && /* @__PURE__ */ jsx(Alert, { variant: "error", children: errors["name"].message })
      ] })
    ] }) }) })
  ] }) }) });
};
const CategoryView$1 = ({ policies, onCheckChange }) => {
  const categories = [];
  for (const policy of policies) {
    if (categories.find((cat) => {
      var _a;
      return policy.permission.category === void 0 || cat.id === ((_a = policy.permission.category) == null ? void 0 : _a.id);
    })) continue;
    categories.push(policy.permission.category);
  }
  function evaluateStateOfChecked(category) {
    if (category) {
      const policiesOfCategory = policies.filter((pol) => pol.permission.category !== null ? pol.permission.category.id === category.id : false);
      return policiesOfCategory.some((pol) => pol.type === AdminRbacPolicyType.ALLOW);
    } else {
      const policiesOfCategory = policies.filter((pol) => pol.permission.category === null);
      return policiesOfCategory.some((pol) => pol.type === AdminRbacPolicyType.ALLOW);
    }
  }
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Name" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Permissions" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Allow" })
    ] }) }),
    /* @__PURE__ */ jsx(Table.Body, { children: categories.map((category) => {
      return /* @__PURE__ */ jsxs(
        Table.Row,
        {
          className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
          children: [
            /* @__PURE__ */ jsx(Table.Cell, { children: `${category !== null ? category.name : "-"} ` }),
            /* @__PURE__ */ jsx(Table.Cell, { children: `${category !== null ? policies.filter((pol) => pol.permission.category !== null ? pol.permission.category.id === category.id : false).length : policies.filter((pol) => pol.permission.category === null).length}` }),
            /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Switch, { onCheckedChange: (checked) => onCheckChange(checked, category), checked: evaluateStateOfChecked(category) }) })
          ]
        },
        category !== null ? category.id : "-"
      );
    }) })
  ] });
};
const PermissionsView = ({ policies, onCheckChange }) => {
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Matcher" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Action type" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Allow" })
    ] }) }),
    /* @__PURE__ */ jsx(Table.Body, { children: policies.map((policy) => {
      return /* @__PURE__ */ jsxs(
        Table.Row,
        {
          className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
          children: [
            /* @__PURE__ */ jsx(Table.Cell, { children: `${policy.permission.matcher} ` }),
            /* @__PURE__ */ jsx(Table.Cell, { children: policy.permission.actionType }),
            /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Switch, { onCheckedChange: (checked) => onCheckChange(checked, policy), checked: policy.type === AdminRbacPolicyType.ALLOW }) })
          ]
        },
        policy.permission.name
      );
    }) })
  ] });
};
const PoliciesTable$1 = ({ editPolicies, policies }) => {
  function onPermissionCheckChange(checked, policy) {
    if (checked) {
      editPolicies([{
        ...policy,
        type: AdminRbacPolicyType.ALLOW
      }]);
    } else {
      editPolicies([{
        ...policy,
        type: AdminRbacPolicyType.DENY
      }]);
    }
  }
  function onCategoryCheckChange(checked, category) {
    if (category) {
      const policiesOfCategory = policies.filter((pol) => pol.permission.category !== null ? pol.permission.category.id === category.id : false);
      editPolicies(policiesOfCategory.map((polCat) => ({
        ...polCat,
        type: checked ? AdminRbacPolicyType.ALLOW : AdminRbacPolicyType.DENY
      })));
    } else {
      const policiesOfCategory = policies.filter((pol) => pol.permission.category === null);
      editPolicies(policiesOfCategory.map((polCat) => ({
        ...polCat,
        type: checked ? AdminRbacPolicyType.ALLOW : AdminRbacPolicyType.DENY
      })));
    }
  }
  const [viewType, setViewType] = useState(
    "permission"
    /* PERMISSION */
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Grid2, { container: true, marginBottom: 3, spacing: 2, children: [
      /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Switch, {
        onCheckedChange: (checked) => setViewType(
          checked ? "category" : "permission"
          /* PERMISSION */
        ),
        checked: viewType === "category"
        /* CATEGORY */
      }) }),
      /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: viewType === "category" ? "Category view" : "Permission view" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-1 flex-col", children: [
      viewType === "permission" && /* @__PURE__ */ jsx(PermissionsView, { policies, onCheckChange: onPermissionCheckChange }),
      viewType === "category" && /* @__PURE__ */ jsx(CategoryView$1, { policies, onCheckChange: onCategoryCheckChange })
    ] })
  ] });
};
const PoliciesList = ({ editPolicies, policies }) => {
  return /* @__PURE__ */ jsx(Grid2, { container: true, direction: "column", children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(PoliciesTable$1, { editPolicies, policies }) }) });
};
const DrawerLoadPolicies = ({ loadPoliciesFromRole }) => {
  const [chosenRole, setChosenRole] = useState(void 0);
  const [drawerIsOpen, setDrawerIsOpen] = useState(void 0);
  return /* @__PURE__ */ jsxs(Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: [
    /* @__PURE__ */ jsx(Drawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: `Load policies from role` }) }),
    /* @__PURE__ */ jsxs(Drawer.Content, { children: [
      /* @__PURE__ */ jsx(Drawer.Header, { children: /* @__PURE__ */ jsx(Drawer.Title, { children: "Select role" }) }),
      /* @__PURE__ */ jsx(Drawer.Body, { className: "p-4", children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", columnSpacing: 10, rowSpacing: 3, children: [
        /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Label, { children: "Choose role" }) }),
        /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(AvailableRolesList, { setChosenRole }) })
      ] }) }),
      /* @__PURE__ */ jsxs(Drawer.Footer, { children: [
        /* @__PURE__ */ jsx(Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Cancel" }) }),
        /* @__PURE__ */ jsx(Button, { onClick: () => {
          loadPoliciesFromRole(chosenRole.policies);
          setDrawerIsOpen(false);
        }, children: "Load" })
      ] })
    ] })
  ] });
};
const CreateRolePoliciesStep = ({ configuredPolicies, editPolicies, loadPoliciesFromRole }) => {
  return /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Grid2, { size: 8, children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 5, marginTop: 2, children: [
    /* @__PURE__ */ jsxs(Grid2, { container: true, justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", spacing: 1, children: [
        /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Edit policies" }) }),
        /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: "Define policies for the role" }) })
      ] }),
      /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(DrawerLoadPolicies, { loadPoliciesFromRole }) })
    ] }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(PoliciesList, { editPolicies, policies: configuredPolicies }) })
  ] }) }) });
};
const tabOrder = [
  "general",
  "policies"
  /* POLICIES */
];
const initialTabState = {
  [
    "general"
    /* GENERAL */
  ]: "in-progress",
  [
    "policies"
    /* POLICIES */
  ]: "not-started"
};
const PrimaryButton = ({ tab, next, isLoading, handleSubmit }) => {
  if (tab === "general") {
    return /* @__PURE__ */ jsx(Button, { onClick: () => next(tab), children: "Continue" });
  }
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: "submit",
      isLoading,
      onClick: handleSubmit,
      children: "Create"
    },
    "submit-button"
  );
};
const CreateRoleModal = ({ reloadTable }) => {
  const { register, handleSubmit, formState: { errors }, getValues, setError, clearErrors, reset } = useForm();
  const [activeTab, setActiveTab] = useState(
    "general"
    /* GENERAL */
  );
  const [tabState, setTabState] = useState(initialTabState);
  const [policies, setPolicies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(void 0);
  function handleEditPolicies(editedPolicies) {
    const filteredPolicies = policies.filter((policy) => !editedPolicies.some((ePol) => ePol.permission.id === policy.permission.id));
    setPolicies([...filteredPolicies, ...editedPolicies].sort((a, b) => `${a.permission.matcher} ${a.permission.actionType}` > `${b.permission.matcher} ${b.permission.actionType}` ? -1 : 1));
  }
  function loadPoliciesFromRole(loadedPolicies) {
    const filteredPolicies = policies.filter((policy) => !loadedPolicies.some((ePol) => ePol.permission.id === policy.permission.id));
    setPolicies([...filteredPolicies, ...loadedPolicies].sort((a, b) => `${a.permission.matcher} ${a.permission.actionType}` > `${b.permission.matcher} ${b.permission.actionType}` ? -1 : 1));
  }
  const partialFormValidation = (tab) => {
    switch (tab) {
      case "general":
        if (getValues("name") && getValues.length > 0) {
          clearErrors("name");
          return true;
        } else {
          setError("name", { type: "custom", message: "Please fill the name" });
          return false;
        }
      default:
        return true;
    }
  };
  useEffect(() => {
    if (!isOpen) {
      reset();
      setActiveTab(
        "general"
        /* GENERAL */
      );
      setTabState(initialTabState);
      setLoading(true);
    }
  }, [isOpen]);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/permissions`, {
      credentials: "include"
    }).then((res) => res.json()).then((permissions) => {
      const initialPolicies = permissions.map((perm) => {
        return {
          type: AdminRbacPolicyType.ALLOW,
          permission: perm
        };
      });
      setPolicies(initialPolicies.sort((a, b) => `${a.permission.matcher} ${a.permission.actionType}` > `${b.permission.matcher} ${b.permission.actionType}` ? -1 : 1));
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  const isTabDirty = (tab) => {
    return partialFormValidation(tab);
  };
  const onSubmit = (data) => {
    fetch(`/admin/rbac/roles`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        policies
      })
    }).then((res) => res.json()).then(({ message }) => {
      toast.info("Role", {
        description: "New role has been created"
      });
      reloadTable(true);
      setIsOpen(false);
      if (message) {
        throw message;
      }
    }).catch((e) => {
      console.error(e);
    });
  };
  function handleChangeTab(newTab) {
    if (activeTab === newTab) {
      return;
    }
    if (tabOrder.indexOf(newTab) < tabOrder.indexOf(activeTab)) {
      const isCurrentTabDirty = isTabDirty(activeTab);
      setTabState((prev) => ({
        ...prev,
        [activeTab]: isCurrentTabDirty ? prev[activeTab] : "not-started",
        [newTab]: "in-progress"
      }));
      setActiveTab(newTab);
      return;
    }
    const tabs = tabOrder.slice(0, tabOrder.indexOf(newTab));
    for (const tab of tabs) {
      if (tab === "general") {
        if (!partialFormValidation(tab)) {
          setTabState((prev) => ({
            ...prev,
            [tab]: "in-progress"
          }));
          setActiveTab(tab);
          return;
        }
        setTabState((prev) => ({
          ...prev,
          [tab]: "completed"
        }));
      } else if (tab === "policies") {
        if (!partialFormValidation(tab)) {
          setTabState((prev) => ({
            ...prev,
            [tab]: "in-progress"
          }));
          setActiveTab(tab);
          return;
        }
        setTabState((prev) => ({
          ...prev,
          [tab]: "completed"
        }));
      }
    }
    setTabState((prev) => ({
      ...prev,
      [activeTab]: "completed",
      [newTab]: "in-progress"
    }));
    setActiveTab(newTab);
  }
  const handleNextTab = (tab) => {
    if (tabOrder.indexOf(tab) + 1 >= tabOrder.length) {
      return;
    }
    const nextTab = tabOrder[tabOrder.indexOf(tab) + 1];
    handleChangeTab(nextTab);
  };
  return /* @__PURE__ */ jsxs(FocusModal, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsx(FocusModal.Trigger, { children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Create" }) }),
    /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsx(FocusModal.Content, { children: /* @__PURE__ */ jsxs(
      ProgressTabs,
      {
        value: activeTab,
        onValueChange: (tab) => handleChangeTab(tab),
        className: "flex h-full flex-col overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(FocusModal.Header, { children: /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-between gap-x-4", children: /* @__PURE__ */ jsx("div", { className: "-my-2 w-full max-w-[600px] border-l", children: /* @__PURE__ */ jsxs(ProgressTabs.List, { children: [
            /* @__PURE__ */ jsx(
              ProgressTabs.Trigger,
              {
                value: "general",
                status: tabState.general,
                children: "General"
              }
            ),
            /* @__PURE__ */ jsx(
              ProgressTabs.Trigger,
              {
                value: "policies",
                status: tabState.policies,
                children: "Policies"
              }
            )
          ] }) }) }) }),
          /* @__PURE__ */ jsxs(FocusModal.Body, { className: "size-full overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              ProgressTabs.Content,
              {
                className: "size-full overflow-y-auto",
                value: "general",
                children: /* @__PURE__ */ jsx(EditRoleStep, { register, errors })
              }
            ),
            /* @__PURE__ */ jsx(
              ProgressTabs.Content,
              {
                className: "size-full overflow-y-auto",
                value: "policies",
                children: /* @__PURE__ */ jsx(CreateRolePoliciesStep, { configuredPolicies: policies, editPolicies: handleEditPolicies, loadPoliciesFromRole })
              }
            )
          ] }),
          /* @__PURE__ */ jsx(FocusModal.Footer, { children: /* @__PURE__ */ jsx(Grid2, { container: true, justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, columnSpacing: 2, rowSpacing: 5, children: [
            /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(FocusModal.Close, { children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Cancel" }) }) }),
            /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
              PrimaryButton,
              {
                tab: activeTab,
                next: handleNextTab,
                isLoading: false,
                handleSubmit: handleSubmit(onSubmit)
              }
            ) })
          ] }) }) }) })
        ]
      }
    ) }) })
  ] });
};
const DeleteRole = ({ roleId, setLoading }) => {
  const handleAction = () => {
    fetch(`/admin/rbac/roles`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: roleId
      })
    }).then((res) => res.json()).then(({ message }) => {
      setLoading(true);
      if (message) {
        throw message;
      }
    }).catch((e) => {
      setLoading(true);
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxs(Prompt, { children: [
    /* @__PURE__ */ jsx(Prompt.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(Trash, {}) }) }),
    /* @__PURE__ */ jsxs(Prompt.Content, { children: [
      /* @__PURE__ */ jsxs(Prompt.Header, { children: [
        /* @__PURE__ */ jsx(Prompt.Title, { children: "Delete role" }),
        /* @__PURE__ */ jsx(Prompt.Description, { children: "Are you sure? This cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxs(Prompt.Footer, { children: [
        /* @__PURE__ */ jsx(Prompt.Cancel, { onClick: (e) => e.stopPropagation(), children: "Cancel" }),
        /* @__PURE__ */ jsx(Prompt.Action, { onClick: (e) => {
          e.stopPropagation();
          handleAction();
        }, children: "Delete" })
      ] })
    ] })
  ] });
};
function RolesTable() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/roles`, {
      credentials: "include"
    }).then((res) => res.json()).then((roles2) => {
      setRoles(roles2);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const pageCount = Math.ceil(roles.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);
  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };
  const currentRoles = useMemo(() => {
    if (isLoading) {
      return [];
    }
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, roles.length);
    return roles.slice(offset, limit);
  }, [currentPage, pageSize, roles, isLoading]);
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/rbac/roles/${id}`);
  };
  return /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
      Header,
      {
        title: "",
        actions: [
          {
            type: "custom",
            children: /* @__PURE__ */ jsx(CreateRoleModal, { reloadTable: () => setLoading(true) })
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1 flex-col", children: [
      /* @__PURE__ */ jsx(Toaster, {}),
      /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
          /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Name" }),
          /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Policies" }),
          /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Members" }),
          /* @__PURE__ */ jsx(Table.HeaderCell, {})
        ] }) }),
        /* @__PURE__ */ jsx(Table.Body, { children: currentRoles.map((role) => {
          return /* @__PURE__ */ jsxs(
            Table.Row,
            {
              onClick: () => handleRowClick(role.id),
              style: { cursor: "pointer" },
              children: [
                /* @__PURE__ */ jsx(Table.Cell, { style: { alignContent: "center" }, children: `${role.name}` }),
                /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 1, paddingY: 1, children: [
                  /* @__PURE__ */ jsx(Grid2, { children: `${role.policies.filter((pol) => pol.type === AdminRbacPolicyType.ALLOW).length} allowed` }),
                  /* @__PURE__ */ jsx(Grid2, { children: `${role.policies.filter((pol) => pol.type === AdminRbacPolicyType.DENY).length} denied` })
                ] }) }),
                /* @__PURE__ */ jsx(Table.Cell, { style: { alignContent: "center" }, children: `${role.users ? role.users.length : 0} assigned` }),
                /* @__PURE__ */ jsx(Table.Cell, { style: { alignContent: "center" }, children: /* @__PURE__ */ jsx(Grid2, { container: true, spacing: 2, children: /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
                  DeleteRole,
                  {
                    roleId: role.id,
                    setLoading
                  }
                ) }) }) })
              ]
            },
            role.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsx(
        Table.Pagination,
        {
          count: roles.length,
          pageSize,
          pageIndex: currentPage,
          pageCount,
          canPreviousPage,
          canNextPage,
          previousPage,
          nextPage
        }
      )
    ] }) })
  ] });
}
const RolesTable$1 = React.memo(RolesTable);
const RolesPage = () => {
  return /* @__PURE__ */ jsx(RbacLicenceCheck, { children: /* @__PURE__ */ jsx(RbacAuthorizationCheck, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Roles" }) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(RolesTable$1, {}) }) })
  ] }) }) });
};
const config = defineRouteConfig({
  label: "Roles"
});
const SingleColumnLayout = ({ children }) => {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-3", children });
};
const SectionRow = ({ title, value, actions }) => {
  const isValueString = typeof value === "string" || !value;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clx(
        `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`,
        {
          "grid-cols-[1fr_1fr_28px]": !!actions
        }
      ),
      children: [
        /* @__PURE__ */ jsx(Text, { size: "small", weight: "plus", leading: "compact", children: title }),
        isValueString ? /* @__PURE__ */ jsx(
          Text,
          {
            size: "small",
            leading: "compact",
            className: "whitespace-pre-line text-pretty",
            children: value ?? "-"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: value }),
        actions && /* @__PURE__ */ jsx("div", { children: actions })
      ]
    }
  );
};
const DrawerEditPermissionGeneral = ({ drawerIsOpen, setDrawerIsOpen, currentPermission, setPermission }) => {
  const [error, setError] = useState(void 0);
  const [name, setName] = useState(currentPermission.name);
  function validateName2(value) {
    if (value && value.length > 0) {
      setError(void 0);
      return true;
    }
    setError("Name cannot be empty");
    return false;
  }
  useEffect(() => {
    setError(void 0);
  }, [drawerIsOpen]);
  return /* @__PURE__ */ jsx(Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: /* @__PURE__ */ jsxs(Drawer.Content, { children: [
    /* @__PURE__ */ jsx(Drawer.Header, { children: /* @__PURE__ */ jsx(Drawer.Title, { children: "Edit permission" }) }),
    /* @__PURE__ */ jsx(Drawer.Body, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
      /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Label, { children: "Name" }) }),
      /* @__PURE__ */ jsxs(Grid2, { children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            value: name,
            onChange: (e) => {
              setName(e.target.value);
              validateName2(e.target.value);
            },
            "aria-invalid": error !== void 0
          }
        ),
        error !== void 0 && /* @__PURE__ */ jsx(Alert, { variant: "error", children: error })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(Drawer.Footer, { children: [
      /* @__PURE__ */ jsx(Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          disabled: error !== void 0,
          onClick: () => {
            if (!error) {
              setPermission({
                ...currentPermission,
                name
              });
            }
          },
          children: "Update"
        }
      )
    ] })
  ] }) });
};
const RbacPermissionGeneral = ({ rbacPermission, reloadTable }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(void 0);
  function updatePermission(permission) {
    fetch(`/admin/rbac/permissions/${permission.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(permission)
    }).then((res) => res.json()).then(({ message }) => {
      reloadTable();
      setDrawerIsOpen(false);
      if (message) {
        throw message;
      }
    }).catch((e) => {
      reloadTable();
      setDrawerIsOpen(false);
      console.error(e);
    });
  }
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y", children: [
    /* @__PURE__ */ jsx(
      Header,
      {
        title: "Overview",
        actions: [
          {
            type: "action-menu",
            props: {
              groups: [
                {
                  actions: [
                    {
                      icon: /* @__PURE__ */ jsx(Pencil, {}),
                      label: "Edit",
                      onClick: () => setDrawerIsOpen(true)
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ),
    /* @__PURE__ */ jsx(DrawerEditPermissionGeneral, { drawerIsOpen, setDrawerIsOpen, currentPermission: rbacPermission, setPermission: updatePermission }),
    /* @__PURE__ */ jsx(SectionRow, { title: "Name", value: rbacPermission.name }),
    /* @__PURE__ */ jsx(SectionRow, { title: "Type", value: rbacPermission.type }),
    /* @__PURE__ */ jsx(SectionRow, { title: "Matcher type", value: rbacPermission.matcherType }),
    /* @__PURE__ */ jsx(SectionRow, { title: "Action type", value: rbacPermission.actionType }),
    /* @__PURE__ */ jsx(SectionRow, { title: "Category", value: rbacPermission.category ? rbacPermission.category.name : "-" })
  ] });
};
const RbacPermissionPage = () => {
  const { permissionId } = useParams();
  const [permission, setPermission] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/permissions/${permissionId}`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setPermission({
        ...result.permission
      });
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(CircularProgress, {});
  }
  return /* @__PURE__ */ jsx(SingleColumnLayout, { children: /* @__PURE__ */ jsx(RbacPermissionGeneral, { rbacPermission: permission, reloadTable: () => setLoading(true) }) });
};
const DrawerEditRoleGeneral = ({ drawerIsOpen, setDrawerIsOpen, currentRole, setRole }) => {
  const [error, setError] = useState(void 0);
  const [name, setName] = useState(currentRole.name);
  function validateName2(value) {
    if (value && value.length > 0) {
      setError(void 0);
      return true;
    }
    setError("Name cannot be empty");
    return false;
  }
  useEffect(() => {
    setError(void 0);
  }, [drawerIsOpen]);
  return /* @__PURE__ */ jsx(Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: /* @__PURE__ */ jsxs(Drawer.Content, { children: [
    /* @__PURE__ */ jsx(Drawer.Header, { children: /* @__PURE__ */ jsx(Drawer.Title, { children: "Edit role" }) }),
    /* @__PURE__ */ jsx(Drawer.Body, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
      /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Label, { children: "Name" }) }),
      /* @__PURE__ */ jsxs(Grid2, { children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            value: name,
            onChange: (e) => {
              setName(e.target.value);
              validateName2(e.target.value);
            },
            "aria-invalid": error !== void 0
          }
        ),
        error !== void 0 && /* @__PURE__ */ jsx(Alert, { variant: "error", children: error })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(Drawer.Footer, { children: [
      /* @__PURE__ */ jsx(Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          disabled: error !== void 0,
          onClick: () => {
            if (!error) {
              setRole({
                ...currentRole,
                name
              });
            }
          },
          children: "Update"
        }
      )
    ] })
  ] }) });
};
const AssignedUsers = ({ users }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Text, { size: "small", leading: "compact", children: users.length }) });
};
const RbacRoleGeneral = ({ rbacRole, reloadTable }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(void 0);
  function updateRole(role) {
    fetch(`/admin/rbac/roles/${rbacRole.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(role)
    }).then((res) => res.json()).then(({ message }) => {
      reloadTable();
      setDrawerIsOpen(false);
      if (message) {
        throw message;
      }
    }).catch((e) => {
      reloadTable();
      setDrawerIsOpen(false);
      console.error(e);
    });
  }
  return /* @__PURE__ */ jsxs(Container, { className: "divide-y", children: [
    /* @__PURE__ */ jsx(
      Header,
      {
        title: "Overview",
        actions: [
          {
            type: "action-menu",
            props: {
              groups: [
                {
                  actions: [
                    {
                      icon: /* @__PURE__ */ jsx(Pencil, {}),
                      label: "Edit",
                      onClick: () => setDrawerIsOpen(true)
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ),
    /* @__PURE__ */ jsx(DrawerEditRoleGeneral, { drawerIsOpen, setDrawerIsOpen, currentRole: rbacRole, setRole: updateRole }),
    /* @__PURE__ */ jsx(SectionRow, { title: "Name", value: rbacRole.name }),
    /* @__PURE__ */ jsx(SectionRow, { title: "Policies", value: `${rbacRole.policies.filter((pol) => pol.type === AdminRbacPolicyType.ALLOW).length} allowed, 
                  ${rbacRole.policies.filter((pol) => pol.type === AdminRbacPolicyType.DENY).length} denied` }),
    /* @__PURE__ */ jsx(SectionRow, { title: "Users", value: /* @__PURE__ */ jsx(AssignedUsers, { users: rbacRole.users }) })
  ] });
};
function UsersTable({ users }) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;
  const pageCount = Math.ceil(users.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);
  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };
  const currentUsers = useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, users.length);
    return users.slice(offset, limit);
  }, [currentPage, pageSize, users]);
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-1 flex-col", children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Email" }),
        /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Name" }),
        /* @__PURE__ */ jsx(Table.HeaderCell, {})
      ] }) }),
      /* @__PURE__ */ jsx(Table.Body, { children: currentUsers.map((user) => {
        const name = user.first_name !== null && user.last_name !== null ? `${user.first_name} ${user.last_name}` : "-";
        return /* @__PURE__ */ jsxs(
          Table.Row,
          {
            children: [
              /* @__PURE__ */ jsx(Table.Cell, { children: `${user.email} ` }),
              /* @__PURE__ */ jsx(Table.Cell, { children: name })
            ]
          },
          user.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx(
      Table.Pagination,
      {
        count: users.length,
        pageSize,
        pageIndex: currentPage,
        pageCount,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage
      }
    )
  ] });
}
const RbacRoleAssignedUsers = ({ rbacRole }) => {
  return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", className: "divide-y", children: [
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(
      Header,
      {
        title: `Assigned users`
      }
    ) }),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(UsersTable, { users: rbacRole.users }) })
  ] }) });
};
const policyBadgeDecisionColorMap = /* @__PURE__ */ new Map([
  ["allow", "green"],
  ["deny", "red"],
  ["partially allow", "purple"]
]);
const PermissionView = ({ policies }) => {
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Name" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Type" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Target" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Action" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Decision" })
    ] }) }),
    /* @__PURE__ */ jsx(Table.Body, { children: policies.map((policy) => {
      return /* @__PURE__ */ jsxs(
        Table.Row,
        {
          children: [
            /* @__PURE__ */ jsx(Table.Cell, { children: `${policy.permission.name}` }),
            /* @__PURE__ */ jsx(Table.Cell, { children: policy.permission.matcherType }),
            /* @__PURE__ */ jsx(Table.Cell, { children: `${policy.permission.matcher}` }),
            /* @__PURE__ */ jsx(Table.Cell, { children: `${policy.permission.actionType}` }),
            /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Badge, { color: policy.type === AdminRbacPolicyType.ALLOW ? "green" : "red", children: policy.type.toUpperCase() }) })
          ]
        },
        policy.id
      );
    }) })
  ] });
};
const CategoryView = ({ currentCategories, allPolicies }) => {
  function evaluateBadgeDecision(category) {
    let policiesOfCategory = [];
    if (category) {
      policiesOfCategory = allPolicies.filter((pol) => pol.permission.category !== null ? pol.permission.category.id === category.id : false);
    } else {
      policiesOfCategory = allPolicies.filter((pol) => pol.permission.category === null);
    }
    if (policiesOfCategory.every((pol) => pol.type === AdminRbacPolicyType.ALLOW)) {
      return "allow";
    }
    if (policiesOfCategory.every((pol) => pol.type === AdminRbacPolicyType.DENY)) {
      return "deny";
    }
    return "partially allow";
  }
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(Table.Header, { children: /* @__PURE__ */ jsxs(Table.Row, { children: [
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Name" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Permissions" }),
      /* @__PURE__ */ jsx(Table.HeaderCell, { children: "Allow" })
    ] }) }),
    /* @__PURE__ */ jsx(Table.Body, { children: currentCategories.map((category) => {
      const badgeDecision = evaluateBadgeDecision(category);
      return /* @__PURE__ */ jsxs(
        Table.Row,
        {
          className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
          children: [
            /* @__PURE__ */ jsx(Table.Cell, { children: `${category !== null ? category.name : "-"} ` }),
            /* @__PURE__ */ jsx(Table.Cell, { children: `${category !== null ? allPolicies.filter((pol) => pol.permission.category !== null ? pol.permission.category.id === category.id : false).length : allPolicies.filter((pol) => pol.permission.category === null).length}` }),
            /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Badge, { color: policyBadgeDecisionColorMap.get(badgeDecision), children: badgeDecision.toUpperCase() }) })
          ]
        },
        category !== null ? category.id : "-"
      );
    }) })
  ] });
};
function PoliciesTable({ policies, viewType }) {
  const categories = [];
  for (const policy of policies) {
    if (categories.find((cat) => {
      var _a;
      return policy.permission.category === void 0 || cat.id === ((_a = policy.permission.category) == null ? void 0 : _a.id);
    })) continue;
    categories.push(policy.permission.category);
  }
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 3;
  const pageCount = Math.ceil(policies.length / pageSize);
  const pageCountCategory = Math.ceil(categories.length / pageSize);
  const canNextPage = useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = useMemo(() => currentPage - 1 >= 0, [currentPage]);
  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };
  const currentPolicies = useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, policies.length);
    return policies.slice(offset, limit);
  }, [currentPage, pageSize, policies]);
  const currentCategories = useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, categories.length);
    return categories.slice(offset, limit);
  }, [currentPage, pageSize, policies]);
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-1 flex-col", children: [
    viewType === "permission" && /* @__PURE__ */ jsx(PermissionView, { policies: currentPolicies }),
    viewType === "category" && /* @__PURE__ */ jsx(CategoryView, { currentCategories, allPolicies: policies }),
    viewType === "category" && /* @__PURE__ */ jsx(
      Table.Pagination,
      {
        count: categories.length,
        pageSize,
        pageIndex: currentPage,
        pageCount: pageCountCategory,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage
      }
    ),
    viewType === "permission" && /* @__PURE__ */ jsx(
      Table.Pagination,
      {
        count: policies.length,
        pageSize,
        pageIndex: currentPage,
        pageCount,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage
      }
    )
  ] });
}
const RbacRoleAssignedPolicies = ({ rbacRole }) => {
  const [viewType, setViewType] = useState(
    "permission"
    /* PERMISSION */
  );
  return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Grid2, { container: true, direction: "column", className: "divide-y", children: [
    /* @__PURE__ */ jsx(
      Header,
      {
        title: `Assigned policies`,
        actions: [
          {
            type: "custom",
            children: /* @__PURE__ */ jsxs(Grid2, { container: true, paddingRight: 5, spacing: 2, children: [
              /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Text, { children: viewType === "category" ? "Category view" : "Permission view" }) }),
              /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(Switch, {
                onCheckedChange: (checked) => setViewType(
                  checked ? "category" : "permission"
                  /* PERMISSION */
                ),
                checked: viewType === "category"
                /* CATEGORY */
              }) })
            ] })
          }
        ]
      }
    ),
    /* @__PURE__ */ jsx(Grid2, { children: /* @__PURE__ */ jsx(PoliciesTable, { policies: rbacRole.policies, viewType }) })
  ] }) });
};
const RbacRolePage = () => {
  const { roleId } = useParams();
  const [role, setRole] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/rbac/roles/${roleId}`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setRole({
        ...result.role,
        users: result.users,
        policies: result.role.policies
      });
      setLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(CircularProgress, {});
  }
  return /* @__PURE__ */ jsxs(SingleColumnLayout, { children: [
    /* @__PURE__ */ jsx(RbacRoleGeneral, { rbacRole: role, reloadTable: () => setLoading(true) }),
    /* @__PURE__ */ jsx(RbacRoleAssignedUsers, { rbacRole: role }),
    /* @__PURE__ */ jsx(RbacRoleAssignedPolicies, { rbacRole: role })
  ] });
};
const widgetModule = { widgets: [
  {
    Component: CustomersUnAuthorized,
    zone: ["customer.list.before"]
  },
  {
    Component: OrdersUnauthorized,
    zone: ["order.list.before"]
  },
  {
    Component: PriceListsUnauthorized,
    zone: ["price_list.list.before"]
  },
  {
    Component: ProductsUnauthorized,
    zone: ["product.list.before"]
  }
] };
const routeModule = {
  routes: [
    {
      Component: RbacPage,
      path: "/rbac"
    },
    {
      Component: MembersPage,
      path: "/rbac/members"
    },
    {
      Component: PermissionsPage,
      path: "/rbac/permissions"
    },
    {
      Component: RolesPage,
      path: "/rbac/roles"
    },
    {
      Component: RbacPermissionPage,
      path: "/rbac/permissions/:permissionId"
    },
    {
      Component: RbacRolePage,
      path: "/rbac/roles/:roleId"
    }
  ]
};
const menuItemModule = {
  menuItems: [
    {
      label: config$3.label,
      icon: config$3.icon,
      path: "/rbac",
      nested: void 0
    },
    {
      label: config$2.label,
      icon: void 0,
      path: "/rbac/members",
      nested: void 0
    },
    {
      label: config$1.label,
      icon: void 0,
      path: "/rbac/permissions",
      nested: void 0
    },
    {
      label: config.label,
      icon: void 0,
      path: "/rbac/roles",
      nested: void 0
    }
  ]
};
const formModule = { customFields: {} };
const displayModule = {
  displays: {}
};
const plugin = {
  widgetModule,
  routeModule,
  menuItemModule,
  formModule,
  displayModule
};
export {
  plugin as default
};
