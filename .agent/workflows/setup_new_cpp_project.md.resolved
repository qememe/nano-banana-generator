---
description: Setup a new Modern C++ Project with CMake
---

# Setup New C++ Project

This workflow sets up a standard CMake-based C++ project.

1.  Create the directory structure.
    ```bash
    mkdir -p src include tests build
    ```
2.  Create a modern `CMakeLists.txt`.
    ```cmake
    cmake_minimum_required(VERSION 3.15)
    project(MyProject VERSION 1.0 LANGUAGES CXX)

    set(CMAKE_CXX_STANDARD 20)
    set(CMAKE_CXX_STANDARD_REQUIRED ON)

    add_executable(MyApp src/main.cpp)
    target_include_directories(MyApp PRIVATE include)
    ```
3.  Create a "Hello World" `src/main.cpp`.
    ```cpp
    #include <iostream>
    #include <vector>

    int main() {
        std::vector<std::string> msg = {"Hello", "Modern", "C++"};
        for (const auto& word : msg) {
            std::cout << word << " ";
        }
        std::cout << "\n";
        return 0;
    }
    ```
4.  Build the project to verify setup.
    ```bash
    cmake -S . -B build
    cmake --build build
    ```
