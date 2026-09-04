---
title: "Red de Clasificación — Parte 2"
description: "Segunda iteración de la red de clasificación, ajustando capas y regularización para mejorar la generalización."
pubDate: 2024-03-08
category: "Notebooks Analytics"
tags: ["Python", "TensorFlow", "Neural Network", "Classification"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/RedDeClasificacion2/RedDeClasificacion2.ipynb"
draft: true
resources:
  notebooks:
    - name: "Red de Clasificación — Parte 2"
      slug: "red-de-clasificacion-iteracion-2"
      path: "/Proyectos/Notebooks/RedDeClasificacion2/RedDeClasificacion2.ipynb"
---

## El problema

Esta segunda iteración ajusta la arquitectura y el entrenamiento del modelo base para mejorar la generalización sin memorizar nuevamente el conjunto de entrenamiento.

## Resolución

- Mismo conjunto de datos mediante **tensorflow_datasets** y mismo protocolo de evaluación; solo cambia el modelo, para mantener una comparación válida con la referencia.
- Ajustes de arquitectura sobre la variante convolucional (`Conv2D` + `MaxPooling2D` + `Dense`): profundidad y tamaño de capas.
- Entrenamientos de 10 y 50 épocas, con comparación de la exactitud de entrenamiento y de validación para detectar sobreajuste.

## Tecnologías

Python · TensorFlow · Keras · tensorflow_datasets · OpenCV

## Conocimiento demostrado

**Consistencia en la evaluación**: cambiar un elemento por vez y medirlo con la misma referencia. De ese modo, se puede atribuir cada efecto al cambio correspondiente.
