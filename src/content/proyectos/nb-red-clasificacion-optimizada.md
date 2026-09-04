---
title: "Red de Clasificación"
description: "Red de clasificación con ajuste de hiperparámetros y mejora de la precisión respecto del modelo base."
pubDate: 2024-03-12
category: "Notebooks Analytics"
tags: ["Python", "TensorFlow", "Neural Network", "Classification", "Hyperparameter Tuning"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/Red_Clasificacion_Optimizado/Red_Clasificacion_Optimizado.ipynb"
draft: false
resources:
  notebooks:
    - name: "Red de Clasificación"
      slug: "red-de-clasificacion-optimizada"
      path: "/Proyectos/Notebooks/Red_Clasificacion_Optimizado/Red_Clasificacion_Optimizado.ipynb"
---

## El problema

Cierre de la serie de iteraciones sobre el clasificador **MNIST**: además de mejorar las métricas, el código del cuaderno necesitaba una estructura que facilitara su lectura y repetición.

## Resolución

- **Principios SOLID** en práctica: una clase para gestión de datos (Single Responsibility), otra para construcción del modelo (Open/Closed) y otra para el entrenamiento.
- Flujo de datos con **tensorflow_datasets**: carga de MNIST, normalización y procesamiento por lotes encapsulados en la clase de datos.
- Modelo denso (`Flatten` + `Dense`) construido por la clase de modelo, con evaluación de la exactitud sobre el conjunto de prueba.

## Tecnologías

Python · TensorFlow · Keras · tensorflow_datasets · SOLID

## Conocimiento demostrado

Principios de diseño de software aplicados al análisis de datos con cuadernos: separación de los datos, el modelo y el entrenamiento para facilitar la lectura, la repetición y las modificaciones futuras.
