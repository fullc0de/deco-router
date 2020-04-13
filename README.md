# Versionable Express Router

This package provides several decorators to make it easy to build up a router that involves multiple versions of APIs in accordance with the directory convention. It support not only building the router, but also parameter validations and pre/post processing with the middlewares and the injectors.

# Goals
This library expects you to get the following benefits.    

## Easy to build Multiple API Versions
As the apis are growing bigger and older, we would need several branches of them that would have a little different form of responses which can not be unified. Unfortunately, Express.js doesn't support any functions to handle it easily. For that reason, the library provides the following method. 

### Conventional directory structure
The library can interpret certain directory structure as multiple api structure as long as the structure has the following form.

```
base_path
├── v1
│   ├── index.ts
│   └── post-router.ts
│   └── user-router.ts
└── v2
    ├── index.ts
    └── post-router.ts
    └── like-router.ts
```
Directories under `base_path` are used as a router set of each version. Their names must start with letter `v` so that the library can parse each version properly. And, directories must have `index.ts` to export their belonged routers.  


## Declarative Way
Programming in declarative way leads us to focus on our business specification rather than flow of programming. To provide that way, several decorators are provided as follows.

- Route
- PostParam
- QueryParam
- UserAuth
- Middleware
- ErrorMiddleware


# Install
```
npm i -s versionable-express-router
```

# Development
You can link the library by running the following command on root directory.
```
npm link
```
Then, move to a project that is supposed to be linked to the library and run the following command.
```
npm link version-express-router
```
If there is no issues, the library will be shown in the `node_modules` directory on your test project.


## Useful Environment Variables


DEBUG_VERSIONABLE_EXPRESS_ROUTER - If it sets `1`, debugging information will be shown in STDOUT.
