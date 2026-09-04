---
title: "Red Neuronal Convolucional (CNN)"
description: "Implementación de una CNN para la clasificación de imágenes, desarrollada con TensorFlow y Keras."
pubDate: 2024-03-05
category: "Notebooks Analytics"
tags: ["Python", "TensorFlow", "CNN", "Deep Learning", "Computer Vision"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/Red-Neuronal-Convolucional/Red%20Neuronal%20Convolucional.ipynb"
draft: false
resources:
  notebooks:
    - name: "CNN Principal"
      path: "/Proyectos/Notebooks/Red-Neuronal-Convolucional/Red Neuronal Convolucional.ipynb"
    - name: "Análisis Exploratorio"
      path: "/Proyectos/Notebooks/Red-Neuronal-Convolucional/experiments/01_exploratory_analysis.ipynb"
---

## El problema

Una red densa trata cada píxel como independiente y pierde la estructura espacial de la imagen. Las CNN detectan patrones locales —bordes, texturas y formas— y los combinan de manera jerárquica.

## Resolución

- Conjunto de imágenes cargado mediante **tensorflow_datasets**, con normalización y separación de los datos en entrenamiento y prueba.
- Arquitectura convolucional en **Keras**: bloques `Conv2D` + `MaxPooling2D` para extraer variables visuales y luego `Flatten` + `Dense` para clasificar.
- Entrenamientos de 10 y 50 épocas comparando contra la versión densa, con inspección visual de predicciones usando OpenCV y Matplotlib.
- Cuaderno complementario de **análisis exploratorio** en `experiments/`, con la inspección previa del conjunto de datos.

## Tecnologías

Python · TensorFlow · Keras · tensorflow_datasets · OpenCV

## Conocimiento demostrado

La convolución emplea menos parámetros que una red densa equivalente y obtiene mayor exactitud porque su arquitectura considera la relación entre píxeles vecinos.
