#coding_style
# Google C++ Style Guide: Key Naming Conventions

Adhering to consistent naming conventions helps improve the readability and maintainability of C++ code. Google’s C++ Style Guide provides clear rules for naming variables, functions, classes, and other elements of your codebase. Here’s a quick reference to the essential conventions.

## 1. Variables

- **Local Variables**:
  - Use `snake_case` for local variables.
  - Example:
    ```cpp
    int user_count = 0;
    ```

- **Global Variables**:
  - Prefix global variables with `g_` to differentiate them.
  - Example:
    ```cpp
    int g_total_users = 100;
    ```

## 2. Classes and Structs

- **Class Names**:
  - Class names should follow **PascalCase** (UpperCamelCase).
  - Example:
    ```cpp
    class UserProfile {};
    ```

- **Struct Names**:
  - Struct names also use **PascalCase**.
  - Example:
    ```cpp
    struct Address {};
    ```

## 3. Member Variables

- **Class Member Variables**:
  - Use `snake_case` with a trailing underscore (`_`) to indicate private or protected members.
  - Example:
    ```cpp
    class UserProfile {
        std::string user_name_;
    };
    ```

- **Struct Variables**:
  - Use `snake_case` for member variables without the trailing underscore.
  - Example:
    ```cpp
    struct Address {
        std::string street;
    };
    ```

## 4. Functions

- **Function Names**:
  - Use `snake_case` for functions, making sure names clearly describe the action or purpose.
  - Example:
    ```cpp
    void calculate_user_age();
    ```

## 5. Constants

- **Constant Names**:
  - Use `kPascalCase` for constant values.
  - Example:
    ```cpp
    const int kMaxRetries = 5;
    ```

## 6. Enums

- **Enum Types and Values**:
  - Enum types and values follow **PascalCase**.
  - Example:
    ```cpp
    enum class UserStatus {
        Active,
        Inactive
    };
    ```

## 7. File Names

- **Source and Header Files**:
  - Use `snake_case` for filenames, with `.cpp` for source files and `.h` for headers.
  - Example:
    ```bash
    user_profile.cpp
    user_profile.h
    ```

## Conclusion

Following these core naming conventions from Google’s C++ Style Guide helps make your code more readable and maintainable, ensuring consistency across projects.
