"use strict";
const jsxRuntime = require("react/jsx-runtime");
const adminSdk = require("@medusajs/admin-sdk");
const ui = require("@medusajs/ui");
const React = require("react");
const material = require("@mui/material");
const icons = require("@medusajs/icons");
const reactRouterDom = require("react-router-dom");
const reactHookForm = require("react-hook-form");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const React__default = /* @__PURE__ */ _interopDefault(React);
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
  return /* @__PURE__ */ jsxRuntime.jsx("ul", { children: actionTypes.map((actionType) => {
    return /* @__PURE__ */ jsxRuntime.jsx("li", { children: ` - ${getActionMessage(actionType)}` });
  }) });
};
const TestMyAuthorization = ({ urlToTest }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [authorizationResult, setAuthorizationResult] = React.useState(void 0);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: !isLoading && authorizationResult && authorizationResult.denied.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Alert, { variant: "error", children: [
    `You are unauthorized to:`,
    /* @__PURE__ */ jsxRuntime.jsx(ActionsList, { actionTypes: authorizationResult.denied })
  ] }) }) });
};
const CustomersUnAuthorized = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(TestMyAuthorization, { urlToTest: "/admin/customers" });
};
adminSdk.defineWidgetConfig({
  zone: "customer.list.before"
});
const OrdersUnauthorized = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(TestMyAuthorization, { urlToTest: "/admin/orders" });
};
adminSdk.defineWidgetConfig({
  zone: "order.list.before"
});
const PriceListsUnauthorized = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(TestMyAuthorization, { urlToTest: "/admin/price-lists" });
};
adminSdk.defineWidgetConfig({
  zone: "price_list.list.before"
});
const ProductsUnauthorized = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(TestMyAuthorization, { urlToTest: "/admin/products" });
};
adminSdk.defineWidgetConfig({
  zone: "product.list.before"
});
const DashboardMembersCard = () => {
  const [members, setMembers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
        !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Heading, { children: [
          members.length,
          " ",
          members.length === 1 ? "member" : "members"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: !isLoading && /* @__PURE__ */ jsxRuntime.jsx(icons.Users, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { children: [
        members.filter((member) => member.role !== void 0).length,
        " assigned"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { children: [
        members.filter((member) => member.role === void 0).length,
        " unassigned"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Link,
      {
        to: `/rbac/members`,
        style: { display: "contents" },
        children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { children: "Configure" })
      }
    ) })
  ] }) });
};
const DashboardRolesCard = () => {
  const [roles, setRoles] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
        !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Heading, { children: [
          roles.length,
          " ",
          roles.length === 1 ? "role" : "roles"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: !isLoading && /* @__PURE__ */ jsxRuntime.jsx(icons.AcademicCap, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { children: [
        roles.filter((role) => role.users !== void 0 && role.users.length > 0).length,
        " used"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { children: [
        roles.filter((role) => role.users === void 0 || role.users.length === 0).length,
        " not used"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Link,
      {
        to: `/rbac/roles`,
        style: { display: "contents" },
        children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { children: "Configure" })
      }
    ) })
  ] }) });
};
const AssignedRolesList = ({ sortedRoles }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 2, children: [
    sortedRoles.map((sortedRole) => {
      return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, columnSpacing: 1, alignItems: "center", justifyContent: "space-between", children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: sortedRole.name }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, columnSpacing: 1, alignItems: "center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: sortedRole.users.length }) }),
          /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(icons.Users, {}) })
        ] })
      ] }, sortedRole.id);
    }),
    sortedRoles.length === 0 && /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: `-` }) })
  ] });
};
const DashboardAssignedRolesCard = () => {
  const [roles, setRoles] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { children: `Most used roles` })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxRuntime.jsx(AssignedRolesList, { sortedRoles: roles })
    ] })
  ] }) });
};
const DashboardPermissionsCard = () => {
  const [permissions, setPermissions] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
        isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
        !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Heading, { children: [
          permissions.length,
          " ",
          permissions.length === 1 ? "permission" : "permissions"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: !isLoading && /* @__PURE__ */ jsxRuntime.jsx(icons.LockClosedSolid, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { children: [
        permissions.filter((perm) => perm.type == PermissionType.PREDEFINED).length,
        " predefined"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 10 }),
      !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Text, { children: [
        permissions.filter((perm) => perm.type == PermissionType.CUSTOM).length,
        " custom"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
      reactRouterDom.Link,
      {
        to: `/rbac/permissions`,
        style: { display: "contents" },
        children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { children: "Configure" })
      }
    ) })
  ] }) });
};
const Dashboard = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, rowSpacing: 10, columnSpacing: 10, style: { marginTop: 15 }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { size: 4, children: /* @__PURE__ */ jsxRuntime.jsx(DashboardPermissionsCard, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { size: 4, children: /* @__PURE__ */ jsxRuntime.jsx(DashboardRolesCard, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { size: 4, children: /* @__PURE__ */ jsxRuntime.jsx(DashboardMembersCard, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { size: 4, children: /* @__PURE__ */ jsxRuntime.jsx(DashboardAssignedRolesCard, {}) })
  ] });
};
const RbacAuthorizationCheck = ({ children }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [authorizationResult, setAuthorizationResult] = React.useState(void 0);
  React.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 12 });
  }
  if (authorizationResult.denied.length > 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: "You are unauthorized to manage RBAC" }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { children });
};
const RbacLicenceCheck = ({ children }) => {
  const [licenceStatus, setLicenceStatus] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 12 });
  }
  if (licenceStatus == void 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: "Cannot get licence status" }) });
  }
  switch (licenceStatus) {
    case "EXPIRED":
      return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: "Licence is expired" }) });
    case "INVALID":
      return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: "Licence is invalid" }) });
  }
  if (licenceStatus !== "VALID") {
    return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: "Licence is in unknown state. Please contact us." }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("div", { children });
};
const MainPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "RBAC system" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(Dashboard, {}) })
  ] });
};
const RbacPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(RbacLicenceCheck, { children: /* @__PURE__ */ jsxRuntime.jsx(RbacAuthorizationCheck, { children: /* @__PURE__ */ jsxRuntime.jsx(MainPage, {}) }) });
};
const config$3 = adminSdk.defineRouteConfig({
  label: "RBAC",
  icon: icons.Users
});
const SelectRole = ({ currentRole, roles, setChosenRole }) => {
  const [value, setValue] = React.useState(currentRole ? currentRole.id : void 0);
  const handleChange = (roleId) => {
    setValue(roleId);
    setChosenRole(roles.find((role) => role.id == roleId));
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-[256px]", children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Select, { onValueChange: handleChange, value, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Value, { placeholder: "Select a role" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Content, { children: roles && roles.map((item) => /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Item, { value: item.id, children: `${item.name}` }, item.id)) })
  ] }) });
};
const AvailableRolesList = ({ currentRole, setChosenRole }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [roles, setRoles] = React.useState([]);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, {}),
    !isLoading && /* @__PURE__ */ jsxRuntime.jsx(SelectRole, { currentRole, roles, setChosenRole })
  ] });
};
const DrawerEditUser = ({ currentRole, setRole }) => {
  const [chosenRole, setChosenRole] = React.useState(currentRole);
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(void 0);
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { children: `Assign` }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Title, { children: "Select role" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Body, { className: "p-4", children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", columnSpacing: 10, rowSpacing: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { children: "Choose role" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(AvailableRolesList, { currentRole, setChosenRole }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: "Cancel" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { onClick: () => {
          setRole(chosenRole);
          setDrawerIsOpen(false);
        }, children: "Save" })
      ] })
    ] })
  ] });
};
const RoleBadge = ({ role }) => {
  if (role) {
    return /* @__PURE__ */ jsxRuntime.jsx(ui.Badge, { size: "small", color: "green", children: role.name });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Badge, { size: "small", children: "Unassigned" });
};
function MembersTable() {
  const [members, setMembers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
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
  React.useEffect(() => {
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
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 3;
  const pageCount = Math.ceil(members.length / pageSize);
  const canNextPage = React.useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = React.useMemo(() => currentPage - 1 >= 0, [currentPage]);
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
  const currentMembers = React.useMemo(() => {
    if (isLoading) {
      return [];
    }
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, members.length);
    return members.slice(offset, limit);
  }, [currentPage, pageSize, members, isLoading]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-1 flex-col", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Table, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Table.Row, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Name" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Email" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Role" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { children: currentMembers.map((member) => {
        const name = member.user.first_name !== null && member.user.last_name !== null ? `${member.user.first_name} ${member.user.last_name}` : "-";
        return /* @__PURE__ */ jsxRuntime.jsxs(
          ui.Table.Row,
          {
            className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: name }),
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: member.user.email }),
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(RoleBadge, { role: member.role }) }),
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(DrawerEditUser, { currentRole: member.role, setRole: (role) => assignRole(role.id, member.user.id) }) })
            ]
          },
          member.user.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ui.Table.Pagination,
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
const MembersTable$1 = React__default.default.memo(MembersTable);
const MembersPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(RbacLicenceCheck, { children: /* @__PURE__ */ jsxRuntime.jsx(RbacAuthorizationCheck, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Members" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsx(MembersTable$1, {}) }) })
  ] }) }) });
};
const config$2 = adminSdk.defineRouteConfig({
  label: "Members"
});
const InputCreateCategory = ({ category, setCategory }) => {
  const [error, setError] = React.useState(void 0);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      ui.Input,
      {
        value: category,
        onChange: (e) => setCategory(e.target.value),
        "aria-invalid": error !== void 0
      }
    ),
    error !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: error })
  ] });
};
const DrawerCreateCategory = ({ reload }) => {
  const [categoryName, setCategoryName] = React.useState(void 0);
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(void 0);
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
        ui.toast.info("New category has been created", {
          description: "You can now select it from the list."
        });
      } else {
        const error = await response.json();
        ui.toast.error("Error", {
          description: `New category cannot be created. ${error.message}`
        });
      }
    }).catch((e) => {
      ui.toast.error("Error", {
        description: `New category cannot be created. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: `Create` }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Title, { children: "New category" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", columnSpacing: 10, rowSpacing: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { children: "Name" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(InputCreateCategory, { setCategory: setCategoryName }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: "Cancel" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { onClick: () => {
          onSubmit();
          reload();
          setDrawerIsOpen(false);
        }, children: "Save" })
      ] })
    ] })
  ] });
};
const SelectCategory = ({ currentCategory, setChosenCategory }) => {
  const [value, setValue] = React.useState(void 0);
  const [categories, setCategories] = React.useState([]);
  const handleChange = (categoryId) => {
    if (categoryId !== "None") {
      setValue(categories.find((cat) => cat.id == categoryId));
      setChosenCategory(categories.find((cat) => cat.id == categoryId));
    } else {
      setValue(void 0);
      setChosenCategory("None");
    }
  };
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Select, { onValueChange: handleChange, value: value ? value.id : "None", children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Value, { placeholder: "Select a category" }) }),
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, {}),
      !isLoading && /* @__PURE__ */ jsxRuntime.jsxs(ui.Select.Content, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Item, { value: "None", children: `None` }, "None"),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Separator, {}),
        categories && categories.map((item) => /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Item, { value: item.id, children: `${item.name}` }, item.id))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "You can create new category" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(DrawerCreateCategory, { reload: () => setLoading(true) }) })
  ] });
};
const validateName$2 = (value) => {
  if (value && value.length > 0) {
    return true;
  }
  return false;
};
const CreatePermissionGeneralStep = ({ register, errors, setCategory, currentCategory }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { size: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Create permission" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Set a name which will describe permission" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { marginTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Name" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          ui.Input,
          {
            placeholder: "Reading products",
            ...register("name", {
              validateName: validateName$2
            }),
            "aria-invalid": errors["name"] !== void 0
          }
        ),
        errors["name"] !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: errors["name"].message })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { marginTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Category (optional)" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(SelectCategory, { currentCategory, setChosenCategory: setCategory }) })
    ] }) }) })
  ] }) }) });
};
const SelectMatcherType = ({ currentMatcherType, matcherTypes, setChosenMatcherType }) => {
  const [value, setValue] = React.useState(currentMatcherType);
  const handleChange = (matcherType) => {
    setValue(matcherType);
    setChosenMatcherType(matcherType);
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-[256px]", children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Select, { onValueChange: handleChange, value, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Value, { placeholder: "Select a matcher type" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Content, { children: matcherTypes && matcherTypes.map((item) => /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Item, { value: item, children: `${item}` }, item)) })
  ] }) });
};
const SelectActionType = ({ currentActionType, actionTypes, setChosenActionType }) => {
  const [value, setValue] = React.useState(currentActionType);
  const handleChange = (actionType) => {
    setValue(actionType);
    setChosenActionType(actionType);
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-[256px]", children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Select, { onValueChange: handleChange, value, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Value, { placeholder: "Select an action type" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Content, { children: actionTypes && actionTypes.map((item) => /* @__PURE__ */ jsxRuntime.jsx(ui.Select.Item, { value: item, children: `${item}` }, item)) })
  ] }) });
};
const validateName$1 = (value) => {
  if (value && value.length > 0) {
    return true;
  }
  return false;
};
const InputMatcher = ({ register, errors }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, direction: "column", spacing: 1, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Matcher" }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        ui.Input,
        {
          placeholder: "/admin/products",
          ...register("matcher", {
            validateName: validateName$1
          }),
          "aria-invalid": errors["matcher"] !== void 0
        }
      ),
      errors["matcher"] !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: errors["matcher"].message })
    ] })
  ] }) }) }) });
};
const CreatePermissionConfigurationStep = ({ register, errors, currentMatcherType, currentActionType, setMatcherType, setActionType }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { size: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Configure permission" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Choose matcher type" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(SelectMatcherType, { currentMatcherType, matcherTypes: [PermissionMatcherType.API], setChosenMatcherType: setMatcherType }) }),
    errors["matcherType"] !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: errors["matcherType"].message }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Choose action type" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(SelectActionType, { currentActionType, actionTypes: Object.values(PermissionActionType), setChosenActionType: setActionType }) }),
    errors["actionType"] !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: errors["actionType"].message }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(InputMatcher, { register, errors }) })
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
    return /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { onClick: () => next(tab), children: "Continue" });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    ui.Button,
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
  const { register, handleSubmit, formState: { errors }, getValues, setError, clearErrors, reset } = reactHookForm.useForm({
    defaultValues: {
      name: "",
      matcher: ""
    }
  });
  const [activeTab, setActiveTab] = React.useState(
    "general"
    /* GENERAL */
  );
  const [tabState, setTabState] = React.useState(initialTabState$1);
  const [isOpen, setIsOpen] = React.useState(false);
  const [matcherType, setMatcherType] = React.useState(void 0);
  const [actionType, setActionType] = React.useState(void 0);
  const [category, setCategory] = React.useState(void 0);
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
  React.useEffect(() => {
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
        ui.toast.info("Permission", {
          description: "New permission has been created"
        });
        reloadTable();
        setIsOpen(false);
      } else {
        const error = await response.json();
        ui.toast.error("Permission", {
          description: `New permission cannot be created. ${error.message}`
        });
      }
    }).catch((e) => {
      ui.toast.error("Permission", {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.FocusModal, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: "Create" }) }),
    /* @__PURE__ */ jsxRuntime.jsx("form", { children: /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
      ui.ProgressTabs,
      {
        value: activeTab,
        onValueChange: (tab) => handleChangeTab(tab),
        className: "flex h-full flex-col overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex w-full items-center justify-between gap-x-4", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "-my-2 w-full max-w-[600px] border-l", children: /* @__PURE__ */ jsxRuntime.jsxs(ui.ProgressTabs.List, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.ProgressTabs.Trigger,
              {
                value: "general",
                status: tabState.general,
                children: "General"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.ProgressTabs.Trigger,
              {
                value: "configuration",
                status: tabState.configuration,
                children: "Configuration"
              }
            )
          ] }) }) }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(ui.FocusModal.Body, { className: "size-full overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.ProgressTabs.Content,
              {
                className: "size-full overflow-y-auto",
                value: "general",
                children: /* @__PURE__ */ jsxRuntime.jsx(CreatePermissionGeneralStep, { register, errors, setCategory, currentCategory: category })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.ProgressTabs.Content,
              {
                className: "size-full overflow-y-auto",
                value: "configuration",
                children: /* @__PURE__ */ jsxRuntime.jsx(
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
          /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Footer, { children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, columnSpacing: 2, rowSpacing: 5, children: [
            /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: "Cancel" }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.DropdownMenu.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.IconButton, { size: "small", variant: "transparent", children: /* @__PURE__ */ jsxRuntime.jsx(icons.EllipsisHorizontal, {}) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.DropdownMenu.Content, { children: groups.map((group, index) => {
      if (!group.actions.length) {
        return null;
      }
      const isLast = index === groups.length - 1;
      return /* @__PURE__ */ jsxRuntime.jsxs(ui.DropdownMenu.Group, { children: [
        group.actions.map((action, index2) => {
          if (action.onClick) {
            return /* @__PURE__ */ jsxRuntime.jsxs(
              ui.DropdownMenu.Item,
              {
                disabled: action.disabled,
                onClick: (e) => {
                  e.stopPropagation();
                  action.onClick();
                },
                className: ui.clx(
                  "[&_svg]:text-ui-fg-subtle flex items-center gap-x-2",
                  {
                    "[&_svg]:text-ui-fg-disabled": action.disabled
                  }
                ),
                children: [
                  action.icon,
                  /* @__PURE__ */ jsxRuntime.jsx("span", { children: action.label })
                ]
              },
              index2
            );
          }
          return /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(
            ui.DropdownMenu.Item,
            {
              className: ui.clx(
                "[&_svg]:text-ui-fg-subtle flex items-center gap-x-2",
                {
                  "[&_svg]:text-ui-fg-disabled": action.disabled
                }
              ),
              asChild: true,
              disabled: action.disabled,
              children: /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Link, { to: action.to, onClick: (e) => e.stopPropagation(), children: [
                action.icon,
                /* @__PURE__ */ jsxRuntime.jsx("span", { children: action.label })
              ] })
            }
          ) }, index2);
        }),
        !isLast && /* @__PURE__ */ jsxRuntime.jsx(ui.DropdownMenu.Separator, {})
      ] }, index);
    }) })
  ] });
};
const Header = ({
  title,
  subtitle,
  actions = []
}) => {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between px-6 py-4", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h2", children: title }),
      subtitle && /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { className: "text-ui-fg-subtle", size: "small", children: subtitle })
    ] }),
    actions.length > 0 && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center gap-x-2", children: actions.map((action, index) => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      action.type === "button" && /* @__PURE__ */ React.createElement(
        ui.Button,
        {
          ...action.props,
          size: action.props.size || "small",
          key: index
        },
        /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          action.props.children,
          action.link && /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Link, { ...action.link })
        ] })
      ),
      action.type === "action-menu" && /* @__PURE__ */ jsxRuntime.jsx(ActionMenu, { ...action.props }),
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(ui.IconButton, { children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt.Header, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Title, { children: "Delete role" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Description, { children: "Are you sure? This cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Cancel, { onClick: (e) => e.stopPropagation(), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Action, { onClick: (e) => {
          e.stopPropagation();
          handleAction();
        }, children: "Delete" })
      ] })
    ] })
  ] });
};
const PermissionsTable$1 = ({ permissions, permissionType, reloadTable }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 6;
  const pageCount = Math.ceil(permissions.length / pageSize);
  const canNextPage = React.useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = React.useMemo(() => currentPage - 1 >= 0, [currentPage]);
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
  const currentPermissions = React.useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, permissions.length);
    return permissions.slice(offset, limit);
  }, [currentPage, pageSize, permissions]);
  const navigate = reactRouterDom.useNavigate();
  const handleRowClick = (id) => {
    navigate(`/rbac/permissions/${id}`);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-1 flex-col", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Table, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Table.Row, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Target" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Action" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Type" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Name" }),
        permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { children: currentPermissions.map((permission) => {
        return /* @__PURE__ */ jsxRuntime.jsxs(
          ui.Table.Row,
          {
            onClick: permissionType === PermissionType.CUSTOM ? () => handleRowClick(permission.id) : void 0,
            style: permissionType === PermissionType.CUSTOM ? { cursor: "pointer" } : {},
            className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { style: { alignContent: "center" }, children: `${permission.matcher}` }),
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { style: { alignContent: "center" }, children: `${permission.actionType.toUpperCase()}` }),
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { style: { alignContent: "center" }, children: permission.matcherType }),
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { style: { alignContent: "center" }, children: `${permission.name}` }),
              permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { style: { alignContent: "center" }, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, spacing: 2, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
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
    /* @__PURE__ */ jsxRuntime.jsx(
      ui.Table.Pagination,
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
const PermissionTable = React__default.default.memo(PermissionsTable$1);
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(ui.IconButton, { children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt.Header, { children: [
        category.permissions.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Title, { children: "Delete category with permissions" }),
        category.permissions.length === 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Title, { children: "Delete empty category" }),
        category.permissions.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Description, { children: `Are you sure? This category contains ${category.permissions.length} permissions - they will be deleted also! This cannot be undone.` }),
        category.permissions.length === 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Description, { children: "Are you sure? This cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Cancel, { onClick: (e) => e.stopPropagation(), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Action, { onClick: (e) => {
          e.stopPropagation();
          handleAction();
        }, children: "Delete" })
      ] })
    ] })
  ] });
};
const PermissionCategoryTable = ({ categories, permissionType, reloadTable }) => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 6;
  const pageCountCategory = Math.ceil(categories.length / pageSize);
  const canNextPage = React.useMemo(
    () => currentPage < pageCountCategory - 1,
    [currentPage, pageCountCategory]
  );
  const canPreviousPage = React.useMemo(() => currentPage - 1 >= 0, [currentPage]);
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
  const currentCategories = React.useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, categories.length);
    return categories.slice(offset, limit);
  }, [currentPage, pageSize, categories]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-1 flex-col", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Table, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Table.Row, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Category" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Permissions" }),
        permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { children: currentCategories.map((category) => {
        return /* @__PURE__ */ jsxRuntime.jsxs(
          ui.Table.Row,
          {
            className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${category ? category.name : "-"}` }),
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${category.permissions.length}` }),
              permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, spacing: 2, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
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
    /* @__PURE__ */ jsxRuntime.jsx(
      ui.Table.Pagination,
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
const PermissionCategoryTable$1 = React__default.default.memo(PermissionCategoryTable);
const PermissionsCustomArea = () => {
  const [permissions, setPermissions] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [isLoadingCategories, setLoadingCategories] = React.useState(true);
  function reloadTable() {
    setLoading(true);
    setLoadingCategories(true);
  }
  const params = new URLSearchParams({
    type: PermissionType.CUSTOM
  });
  React.useEffect(() => {
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
  React.useEffect(() => {
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
  const [viewType, setViewType] = React.useState(
    "permission"
    /* PERMISSION */
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
      Header,
      {
        title: `Custom`,
        actions: [
          {
            type: "custom",
            children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, paddingRight: 5, spacing: 2, children: [
              /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: viewType === "category" ? "Category view" : "Permission view" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Switch, {
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
            children: /* @__PURE__ */ jsxRuntime.jsx(CreatePermissionModal, { reloadTable })
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: viewType === "permission" ? /* @__PURE__ */ jsxRuntime.jsx(PermissionTable, { permissions, permissionType: PermissionType.CUSTOM, reloadTable }) : /* @__PURE__ */ jsxRuntime.jsx(PermissionCategoryTable$1, { categories, permissionType: PermissionType.CUSTOM, reloadTable }) })
  ] });
};
const PermissionsPredefinedArea = () => {
  const [permissions, setPermissions] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [isLoadingCategories, setLoadingCategories] = React.useState(true);
  function reloadTable() {
    setLoading(true);
    setLoadingCategories(true);
  }
  const params = new URLSearchParams({
    type: PermissionType.PREDEFINED
  });
  React.useEffect(() => {
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
  React.useEffect(() => {
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
  const [viewType, setViewType] = React.useState(
    "permission"
    /* PERMISSION */
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
      Header,
      {
        title: `Predefined`,
        actions: [
          {
            type: "custom",
            children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, paddingRight: 5, spacing: 2, children: [
              /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: viewType === "category" ? "Category view" : "Permission view" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Switch, {
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
    isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, {}) }),
    !isLoading && /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: viewType === "permission" ? /* @__PURE__ */ jsxRuntime.jsx(PermissionTable, { permissions, permissionType: PermissionType.PREDEFINED, reloadTable }) : /* @__PURE__ */ jsxRuntime.jsx(PermissionCategoryTable$1, { categories, permissionType: PermissionType.PREDEFINED, reloadTable }) })
  ] });
};
function PermissionsList({ permissionType }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    permissionType === PermissionType.PREDEFINED && /* @__PURE__ */ jsxRuntime.jsx(PermissionsPredefinedArea, {}),
    permissionType === PermissionType.CUSTOM && /* @__PURE__ */ jsxRuntime.jsx(PermissionsCustomArea, {})
  ] });
}
const PermissionsTable = React__default.default.memo(PermissionsList);
const PermissionsPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(RbacLicenceCheck, { children: /* @__PURE__ */ jsxRuntime.jsx(RbacAuthorizationCheck, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Permissions" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { style: { marginTop: 15 }, children: /* @__PURE__ */ jsxRuntime.jsx(PermissionsTable, { permissionType: PermissionType.CUSTOM }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsx(PermissionsTable, { permissionType: PermissionType.PREDEFINED }) }) })
  ] }) }) });
};
const config$1 = adminSdk.defineRouteConfig({
  label: "Permissions"
});
const validateName = (value) => {
  if (value && value.length > 0) {
    return true;
  }
  return false;
};
const EditRoleStep = ({ register, errors }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { size: 4, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Create role" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Set a name which will describe what is a role" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { marginTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Name" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          ui.Input,
          {
            placeholder: "Store administrator",
            ...register("name", {
              validateName
            }),
            "aria-invalid": errors["name"] !== void 0
          }
        ),
        errors["name"] !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: errors["name"].message })
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Table, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Table.Row, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Name" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Permissions" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Allow" })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { children: categories.map((category) => {
      return /* @__PURE__ */ jsxRuntime.jsxs(
        ui.Table.Row,
        {
          className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${category !== null ? category.name : "-"} ` }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${category !== null ? policies.filter((pol) => pol.permission.category !== null ? pol.permission.category.id === category.id : false).length : policies.filter((pol) => pol.permission.category === null).length}` }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Switch, { onCheckedChange: (checked) => onCheckChange(checked, category), checked: evaluateStateOfChecked(category) }) })
          ]
        },
        category !== null ? category.id : "-"
      );
    }) })
  ] });
};
const PermissionsView = ({ policies, onCheckChange }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Table, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Table.Row, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Matcher" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Action type" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Allow" })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { children: policies.map((policy) => {
      return /* @__PURE__ */ jsxRuntime.jsxs(
        ui.Table.Row,
        {
          className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${policy.permission.matcher} ` }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: policy.permission.actionType }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Switch, { onCheckedChange: (checked) => onCheckChange(checked, policy), checked: policy.type === AdminRbacPolicyType.ALLOW }) })
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
  const [viewType, setViewType] = React.useState(
    "permission"
    /* PERMISSION */
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, marginBottom: 3, spacing: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Switch, {
        onCheckedChange: (checked) => setViewType(
          checked ? "category" : "permission"
          /* PERMISSION */
        ),
        checked: viewType === "category"
        /* CATEGORY */
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: viewType === "category" ? "Category view" : "Permission view" }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-1 flex-col", children: [
      viewType === "permission" && /* @__PURE__ */ jsxRuntime.jsx(PermissionsView, { policies, onCheckChange: onPermissionCheckChange }),
      viewType === "category" && /* @__PURE__ */ jsxRuntime.jsx(CategoryView$1, { policies, onCheckChange: onCategoryCheckChange })
    ] })
  ] });
};
const PoliciesList = ({ editPolicies, policies }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, direction: "column", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(PoliciesTable$1, { editPolicies, policies }) }) });
};
const DrawerLoadPolicies = ({ loadPoliciesFromRole }) => {
  const [chosenRole, setChosenRole] = React.useState(void 0);
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(void 0);
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { children: `Load policies from role` }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Title, { children: "Select role" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Body, { className: "p-4", children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", columnSpacing: 10, rowSpacing: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { children: "Choose role" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(AvailableRolesList, { setChosenRole }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: "Cancel" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { onClick: () => {
          loadPoliciesFromRole(chosenRole.policies);
          setDrawerIsOpen(false);
        }, children: "Load" })
      ] })
    ] })
  ] });
};
const CreateRolePoliciesStep = ({ configuredPolicies, editPolicies, loadPoliciesFromRole }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { size: 8, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 5, marginTop: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", spacing: 1, children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Edit policies" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Define policies for the role" }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(DrawerLoadPolicies, { loadPoliciesFromRole }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(PoliciesList, { editPolicies, policies: configuredPolicies }) })
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
    return /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { onClick: () => next(tab), children: "Continue" });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    ui.Button,
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
  const { register, handleSubmit, formState: { errors }, getValues, setError, clearErrors, reset } = reactHookForm.useForm();
  const [activeTab, setActiveTab] = React.useState(
    "general"
    /* GENERAL */
  );
  const [tabState, setTabState] = React.useState(initialTabState);
  const [policies, setPolicies] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(void 0);
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
  React.useEffect(() => {
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
  React.useEffect(() => {
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
      ui.toast.info("Role", {
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.FocusModal, { open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: "Create" }) }),
    /* @__PURE__ */ jsxRuntime.jsx("form", { children: /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(
      ui.ProgressTabs,
      {
        value: activeTab,
        onValueChange: (tab) => handleChangeTab(tab),
        className: "flex h-full flex-col overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex w-full items-center justify-between gap-x-4", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "-my-2 w-full max-w-[600px] border-l", children: /* @__PURE__ */ jsxRuntime.jsxs(ui.ProgressTabs.List, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.ProgressTabs.Trigger,
              {
                value: "general",
                status: tabState.general,
                children: "General"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.ProgressTabs.Trigger,
              {
                value: "policies",
                status: tabState.policies,
                children: "Policies"
              }
            )
          ] }) }) }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(ui.FocusModal.Body, { className: "size-full overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.ProgressTabs.Content,
              {
                className: "size-full overflow-y-auto",
                value: "general",
                children: /* @__PURE__ */ jsxRuntime.jsx(EditRoleStep, { register, errors })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              ui.ProgressTabs.Content,
              {
                className: "size-full overflow-y-auto",
                value: "policies",
                children: /* @__PURE__ */ jsxRuntime.jsx(CreateRolePoliciesStep, { configuredPolicies: policies, editPolicies: handleEditPolicies, loadPoliciesFromRole })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Footer, { children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, columnSpacing: 2, rowSpacing: 5, children: [
            /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: "Cancel" }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(ui.IconButton, { children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {}) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt.Header, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Title, { children: "Delete role" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Description, { children: "Are you sure? This cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Prompt.Footer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Cancel, { onClick: (e) => e.stopPropagation(), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Prompt.Action, { onClick: (e) => {
          e.stopPropagation();
          handleAction();
        }, children: "Delete" })
      ] })
    ] })
  ] });
};
function RolesTable() {
  const [roles, setRoles] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 6;
  const pageCount = Math.ceil(roles.length / pageSize);
  const canNextPage = React.useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = React.useMemo(() => currentPage - 1 >= 0, [currentPage]);
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
  const currentRoles = React.useMemo(() => {
    if (isLoading) {
      return [];
    }
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, roles.length);
    return roles.slice(offset, limit);
  }, [currentPage, pageSize, roles, isLoading]);
  const navigate = reactRouterDom.useNavigate();
  const handleRowClick = (id) => {
    navigate(`/rbac/roles/${id}`);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
      Header,
      {
        title: "",
        actions: [
          {
            type: "custom",
            children: /* @__PURE__ */ jsxRuntime.jsx(CreateRoleModal, { reloadTable: () => setLoading(true) })
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Toaster, {}),
      /* @__PURE__ */ jsxRuntime.jsxs(ui.Table, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Table.Row, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Name" }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Policies" }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Members" }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { children: currentRoles.map((role) => {
          return /* @__PURE__ */ jsxRuntime.jsxs(
            ui.Table.Row,
            {
              onClick: () => handleRowClick(role.id),
              style: { cursor: "pointer" },
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { style: { alignContent: "center" }, children: `${role.name}` }),
                /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 1, paddingY: 1, children: [
                  /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: `${role.policies.filter((pol) => pol.type === AdminRbacPolicyType.ALLOW).length} allowed` }),
                  /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: `${role.policies.filter((pol) => pol.type === AdminRbacPolicyType.DENY).length} denied` })
                ] }) }),
                /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { style: { alignContent: "center" }, children: `${role.users ? role.users.length : 0} assigned` }),
                /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { style: { alignContent: "center" }, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { container: true, spacing: 2, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
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
      /* @__PURE__ */ jsxRuntime.jsx(
        ui.Table.Pagination,
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
const RolesTable$1 = React__default.default.memo(RolesTable);
const RolesPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(RbacLicenceCheck, { children: /* @__PURE__ */ jsxRuntime.jsx(RbacAuthorizationCheck, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Roles" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsx(RolesTable$1, {}) }) })
  ] }) }) });
};
const config = adminSdk.defineRouteConfig({
  label: "Roles"
});
const SingleColumnLayout = ({ children }) => {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col gap-y-3", children });
};
const SectionRow = ({ title, value, actions }) => {
  const isValueString = typeof value === "string" || !value;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: ui.clx(
        `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`,
        {
          "grid-cols-[1fr_1fr_28px]": !!actions
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: "small", weight: "plus", leading: "compact", children: title }),
        isValueString ? /* @__PURE__ */ jsxRuntime.jsx(
          ui.Text,
          {
            size: "small",
            leading: "compact",
            className: "whitespace-pre-line text-pretty",
            children: value ?? "-"
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-1", children: value }),
        actions && /* @__PURE__ */ jsxRuntime.jsx("div", { children: actions })
      ]
    }
  );
};
const DrawerEditPermissionGeneral = ({ drawerIsOpen, setDrawerIsOpen, currentPermission, setPermission }) => {
  const [error, setError] = React.useState(void 0);
  const [name, setName] = React.useState(currentPermission.name);
  function validateName2(value) {
    if (value && value.length > 0) {
      setError(void 0);
      return true;
    }
    setError("Name cannot be empty");
    return false;
  }
  React.useEffect(() => {
    setError(void 0);
  }, [drawerIsOpen]);
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Title, { children: "Edit permission" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { children: "Name" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          ui.Input,
          {
            value: name,
            onChange: (e) => {
              setName(e.target.value);
              validateName2(e.target.value);
            },
            "aria-invalid": error !== void 0
          }
        ),
        error !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: error })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        ui.Button,
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
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(void 0);
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Container, { className: "divide-y", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
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
                      icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {}),
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
    /* @__PURE__ */ jsxRuntime.jsx(DrawerEditPermissionGeneral, { drawerIsOpen, setDrawerIsOpen, currentPermission: rbacPermission, setPermission: updatePermission }),
    /* @__PURE__ */ jsxRuntime.jsx(SectionRow, { title: "Name", value: rbacPermission.name }),
    /* @__PURE__ */ jsxRuntime.jsx(SectionRow, { title: "Type", value: rbacPermission.type }),
    /* @__PURE__ */ jsxRuntime.jsx(SectionRow, { title: "Matcher type", value: rbacPermission.matcherType }),
    /* @__PURE__ */ jsxRuntime.jsx(SectionRow, { title: "Action type", value: rbacPermission.actionType }),
    /* @__PURE__ */ jsxRuntime.jsx(SectionRow, { title: "Category", value: rbacPermission.category ? rbacPermission.category.name : "-" })
  ] });
};
const RbacPermissionPage = () => {
  const { permissionId } = reactRouterDom.useParams();
  const [permission, setPermission] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsx(SingleColumnLayout, { children: /* @__PURE__ */ jsxRuntime.jsx(RbacPermissionGeneral, { rbacPermission: permission, reloadTable: () => setLoading(true) }) });
};
const DrawerEditRoleGeneral = ({ drawerIsOpen, setDrawerIsOpen, currentRole, setRole }) => {
  const [error, setError] = React.useState(void 0);
  const [name, setName] = React.useState(currentRole.name);
  function validateName2(value) {
    if (value && value.length > 0) {
      setError(void 0);
      return true;
    }
    setError("Name cannot be empty");
    return false;
  }
  React.useEffect(() => {
    setError(void 0);
  }, [drawerIsOpen]);
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer, { open: drawerIsOpen, onOpenChange: setDrawerIsOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Title, { children: "Edit role" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", rowSpacing: 3, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { children: "Name" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          ui.Input,
          {
            value: name,
            onChange: (e) => {
              setName(e.target.value);
              validateName2(e.target.value);
            },
            "aria-invalid": error !== void 0
          }
        ),
        error !== void 0 && /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: error })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Drawer.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Drawer.Close, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "secondary", children: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(
        ui.Button,
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
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: "small", leading: "compact", children: users.length }) });
};
const RbacRoleGeneral = ({ rbacRole, reloadTable }) => {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(void 0);
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Container, { className: "divide-y", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
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
                      icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {}),
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
    /* @__PURE__ */ jsxRuntime.jsx(DrawerEditRoleGeneral, { drawerIsOpen, setDrawerIsOpen, currentRole: rbacRole, setRole: updateRole }),
    /* @__PURE__ */ jsxRuntime.jsx(SectionRow, { title: "Name", value: rbacRole.name }),
    /* @__PURE__ */ jsxRuntime.jsx(SectionRow, { title: "Policies", value: `${rbacRole.policies.filter((pol) => pol.type === AdminRbacPolicyType.ALLOW).length} allowed, 
                  ${rbacRole.policies.filter((pol) => pol.type === AdminRbacPolicyType.DENY).length} denied` }),
    /* @__PURE__ */ jsxRuntime.jsx(SectionRow, { title: "Users", value: /* @__PURE__ */ jsxRuntime.jsx(AssignedUsers, { users: rbacRole.users }) })
  ] });
};
function UsersTable({ users }) {
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 3;
  const pageCount = Math.ceil(users.length / pageSize);
  const canNextPage = React.useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = React.useMemo(() => currentPage - 1 >= 0, [currentPage]);
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
  const currentUsers = React.useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, users.length);
    return users.slice(offset, limit);
  }, [currentPage, pageSize, users]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-1 flex-col", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Table, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Table.Row, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Email" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Name" }),
        /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { children: currentUsers.map((user) => {
        const name = user.first_name !== null && user.last_name !== null ? `${user.first_name} ${user.last_name}` : "-";
        return /* @__PURE__ */ jsxRuntime.jsxs(
          ui.Table.Row,
          {
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${user.email} ` }),
              /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: name })
            ]
          },
          user.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ui.Table.Pagination,
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
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", className: "divide-y", children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(
      Header,
      {
        title: `Assigned users`
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(UsersTable, { users: rbacRole.users }) })
  ] }) });
};
const policyBadgeDecisionColorMap = /* @__PURE__ */ new Map([
  ["allow", "green"],
  ["deny", "red"],
  ["partially allow", "purple"]
]);
const PermissionView = ({ policies }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Table, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Table.Row, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Name" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Type" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Target" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Action" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Decision" })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { children: policies.map((policy) => {
      return /* @__PURE__ */ jsxRuntime.jsxs(
        ui.Table.Row,
        {
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${policy.permission.name}` }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: policy.permission.matcherType }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${policy.permission.matcher}` }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${policy.permission.actionType}` }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Badge, { color: policy.type === AdminRbacPolicyType.ALLOW ? "green" : "red", children: policy.type.toUpperCase() }) })
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
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Table, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Table.Row, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Name" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Permissions" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { children: "Allow" })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { children: currentCategories.map((category) => {
      const badgeDecision = evaluateBadgeDecision(category);
      return /* @__PURE__ */ jsxRuntime.jsxs(
        ui.Table.Row,
        {
          className: "[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${category !== null ? category.name : "-"} ` }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: `${category !== null ? allPolicies.filter((pol) => pol.permission.category !== null ? pol.permission.category.id === category.id : false).length : allPolicies.filter((pol) => pol.permission.category === null).length}` }),
            /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Badge, { color: policyBadgeDecisionColorMap.get(badgeDecision), children: badgeDecision.toUpperCase() }) })
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
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 3;
  const pageCount = Math.ceil(policies.length / pageSize);
  const pageCountCategory = Math.ceil(categories.length / pageSize);
  const canNextPage = React.useMemo(
    () => currentPage < pageCount - 1,
    [currentPage, pageCount]
  );
  const canPreviousPage = React.useMemo(() => currentPage - 1 >= 0, [currentPage]);
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
  const currentPolicies = React.useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, policies.length);
    return policies.slice(offset, limit);
  }, [currentPage, pageSize, policies]);
  const currentCategories = React.useMemo(() => {
    const offset = currentPage * pageSize;
    const limit = Math.min(offset + pageSize, categories.length);
    return categories.slice(offset, limit);
  }, [currentPage, pageSize, policies]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-1 flex-col", children: [
    viewType === "permission" && /* @__PURE__ */ jsxRuntime.jsx(PermissionView, { policies: currentPolicies }),
    viewType === "category" && /* @__PURE__ */ jsxRuntime.jsx(CategoryView, { currentCategories, allPolicies: policies }),
    viewType === "category" && /* @__PURE__ */ jsxRuntime.jsx(
      ui.Table.Pagination,
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
    viewType === "permission" && /* @__PURE__ */ jsxRuntime.jsx(
      ui.Table.Pagination,
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
  const [viewType, setViewType] = React.useState(
    "permission"
    /* PERMISSION */
  );
  return /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, direction: "column", className: "divide-y", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Header,
      {
        title: `Assigned policies`,
        actions: [
          {
            type: "custom",
            children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid2, { container: true, paddingRight: 5, spacing: 2, children: [
              /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: viewType === "category" ? "Category view" : "Permission view" }) }),
              /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Switch, {
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
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid2, { children: /* @__PURE__ */ jsxRuntime.jsx(PoliciesTable, { policies: rbacRole.policies, viewType }) })
  ] }) });
};
const RbacRolePage = () => {
  const { roleId } = reactRouterDom.useParams();
  const [role, setRole] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(SingleColumnLayout, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(RbacRoleGeneral, { rbacRole: role, reloadTable: () => setLoading(true) }),
    /* @__PURE__ */ jsxRuntime.jsx(RbacRoleAssignedUsers, { rbacRole: role }),
    /* @__PURE__ */ jsxRuntime.jsx(RbacRoleAssignedPolicies, { rbacRole: role })
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
module.exports = plugin;
