---
title: "Redes Convolucionales — Clasificador"
description: "Dos CNN: reconocimiento de dígitos manuscritos con MNIST y clasificación de imágenes de perros y gatos. Del dato sin procesar a la predicción, capa por capa."
pubDate: 2024-02-13
category: "Análisis de datos"
tags: ["Python", "TensorFlow", "CNN", "Deep Learning", "MNIST", "Computer Vision"]
github: "https://github.com/HoracioLaphitz/Redes-Convolucionales"
resources:
  notebooks:
    - name: "Red Neuronal Convolucional"
      path: "/Proyectos/Notebooks/Redes-Convolucionales-Repo/Red_Neuronal_Convolucional.ipynb"
draft: true
---

## Situación

Las redes convolucionales (CNN) son la base de la visión por computadora moderna. La mejor forma de entenderlas es construirlas sobre problemas clásicos.

## El desafío

Implementar y comparar dos arquitecturas de red sobre dos problemas distintos de clasificación de imágenes.

## La solución

- **Red 1** — reconocimiento de dígitos escritos a mano con el conjunto MNIST.
- **Red 2** — CNN que clasifica imágenes de perros y gatos mediante un conjunto de datos de la biblioteca TensorFlow.

## Impacto

Dos modelos entrenados que ilustran cómo una CNN aprende variables visuales jerárquicas, desde bordes hasta objetos completos. La red de dígitos alcanzó una **exactitud de entrenamiento del 99,76 %** y una pérdida de 0,0072 tras 10 épocas. La curva de pérdida descendió de forma consistente y no mostró señales de sobreajuste severo; la arquitectura y la tasa de aprendizaje resultaron adecuadas para el problema.
