# Permission matrix

| Capability | Admin | Manager | Client | Talent |
|---|---:|---:|---:|---:|
| Global dashboard / project view | Yes | Yes | Own organization | Projects with assigned tasks |
| Create project | Yes | Yes | Own project request | No |
| Change project status | Yes | Yes | No | No |
| Create / assign task | Yes | Yes | No | No |
| View task queue | All | All | Own organization's projects | Assigned tasks only |
| Upload submission | Yes | Yes | Own project files | Assigned task only |
| Review QA | Yes | Yes | Client approval UI not fully implemented | No |
| Talent directory | Yes | Yes | No | Own profile only |
| View internal rates / margin | Yes | No by default | No | No |
| Finance overview | Yes | No | No | No |
| Internal messages | Yes | Yes | No (client-visible channel only) | Assigned project access |
| Audit logs | Schema exists; dedicated viewer not yet implemented | No | No | No |
| User/role administration | Seed/admin-controlled only; full UI pending | No | No | No |

## Enforcement

- API endpoints call `currentUser` / `requireRole` on the server.
- Client project queries are scoped by `organizationId`.
- Talent task queries are scoped by `assigneeId`; project access requires at least one assigned task.
- Client response strips internal financial fields.
- Finance navigation and endpoint visibility are restricted.
- Private file GET validates role, organization, assignment, or uploader identity.

This matrix describes current MVP behavior; it does not claim that unfinished administration screens exist. Review every new endpoint against this matrix before adding it.
