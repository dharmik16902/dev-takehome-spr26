# Checklist

<!-- Make sure you fill out this checklist with what you've done before submitting! -->

- [x] Read the README [please please please]
- [x] Something cool!
- [x] Back-end
  - [x] Minimum Requirements
    - [x] Setup MongoDB database
    - [x] Setup item requests collection
    - [x] `PUT /api/request`
    - [x] `GET /api/request?page=_`
  - [x] Main Requirements
    - [x] `GET /api/request?status=pending`
    - [x] `PATCH /api/request`
  - [x] Above and Beyond
    - [x] Batch edits
    - [x] Batch deletes
- [ ] Front-end
  - [ ] Minimum Requirements
    - [ ] Dropdown component
    - [ ] Table component
    - [ ] Base page [table with data]
    - [ ] Table dropdown interactivity
  - [ ] Main Requirements
    - [ ] Pagination
    - [ ] Tabs
  - [ ] Above and Beyond
    - [ ] Batch edits
    - [ ] Batch deletes

# Notes

- Implemented `GET`, `PUT`, `PATCH` for `/api/request` with MongoDB storage, schema validation, and pagination.
- Requires `MONGODB_URI` (and optional `MONGODB_DB`) in `.env.local` to run and create the collection.
- MongoDB Atlas users should whitelist their IP (or temporarily `0.0.0.0/0`) to allow local testing.
- Above and beyond endpoints:
  - `PATCH /api/request/batch` with body `{ ids: string[], status: "approved" }` returns `{ matchedCount, modifiedCount }`.
  - `DELETE /api/request/batch` with body `{ ids: string[] }` returns `{ deletedCount }`.
