
# GLFW Initialization and Cleanup using GSL and RAII in C++

This file demonstrates how to properly initialize and clean up GLFW using RAII principles and GSL utilities for safety.

```cpp
#include <GLFW/glfw3.h>
#include <glfw_initialization.h>

std::int32_t main(std::int32_t argc, gsl::zstring* argv) 
{
    veng::GlfwInitialization _glfw;
    gsl::not_null window = glfwCreateWindow(800,600, "Vulkan Engine", nullptr, nullptr);
    gsl::final_action _cleanup_window([window]()->void{glfwDestroyWindow(window);});

    while(!glfwWindowShouldClose(window))
    {
        glfwPollEvents();
    }

    return EXIT_SUCCESS;
}
```

## Key Points Explained

1. **Includes**

- **`<GLFW/glfw3.h>`**: This header includes the GLFW library, which provides functions for creating windows and managing input.
- **`<glfw_initialization.h>`**: This custom header contains the definition of `GlfwInitialization`, a struct used for managing the initialization and termination of GLFW via RAII.

2. **`main` Function**

- **Arguments**: Uses `std::int32_t` for integer arguments to be more explicit about their size, and `gsl::zstring* argv` for zero-terminated strings.
- **Return Type**: `std::int32_t` is used for consistency and clarity in modern C++.

3. **RAII-based GLFW Initialization**

```cpp
veng::GlfwInitialization _glfw;
```
- This line ensures that GLFW is initialized when `_glfw` is created and properly terminated when `_glfw` goes out of scope.

4. **GLFW Window Creation**

```cpp
gsl::not_null window = glfwCreateWindow(800, 600, "Vulkan Engine", nullptr, nullptr);
```
- `gsl::not_null` ensures that the window pointer returned by `glfwCreateWindow` is not null, adding safety.

5. **Window Cleanup using `gsl::final_action`**

```cpp
gsl::final_action _cleanup_window([window]()->void{glfwDestroyWindow(window);});
```
- Automatically destroys the window when `_cleanup_window` goes out of scope, ensuring the window is cleaned up correctly.

6. **Event Polling Loop**

```cpp
while (!glfwWindowShouldClose(window))
{
    glfwPollEvents();
}
```
- The loop checks if the window should close and polls for events.

7. **Returning Success**

```cpp
return EXIT_SUCCESS;
```
- Returns success when the program terminates.
