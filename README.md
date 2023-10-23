# coding-project-template

# What have I learned

-   When you surround the app in <React.StrictMode> React often calls some functions twice to test if they are pure, for example Reducers, this helps you catch bugs when 'modifying' state.
    The original code had `action.type = "DONE";` inside the reducer to avoid bugs when the reducer is called twice but I refactored it to be pure.
