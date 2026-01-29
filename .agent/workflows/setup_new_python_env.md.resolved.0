---
description: Setup a new Python AI Environment
---

# Setup New Python AI Project

This workflow creates a virtual environment and installs standard AI tools.

1.  Create a virtual environment.
    ```bash
    python3 -m venv venv
    ```
2.  Activate and Upgrade pip.
    ```bash
    # Note: Tooling might need to run these as separate commands or chained
    source venv/bin/activate
    pip install --upgrade pip
    ```
3.  Install Data Science & AI libraries.
    ```bash
    pip install numpy pandas matplotlib seaborn scikit-learn
    # Ask user if they want PyTorch (default) or TensorFlow
    pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
    ```
4.  Create standard directories.
    ```bash
    mkdir -p data/raw data/processed notebooks src/models src/training
    touch src/main.py
    ```
