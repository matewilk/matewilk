---
title: "ATMs Observability Map"
date: "2021-12-14"
category: ["JavaScript", "React", "Node.js"]
cover: "/images/blog/map-cover.jpeg"
thumb: "/images/blog/sm/map-thumb.png"
---

## ATMs Map

[GitHub Repo](https://github.com/matewilk/atm-map) - for the full source code

ATMs Observability Map is a web application that provides an interface to visualize the status of ATMs in real time in a given area. It provides a comprehensive view of the ATM network. It also allows for filtering ATMs by status and ATM type which is useful for ATM operators who need to quickly identify malfunctioning devices and take appropriate action. The map reflects the filter settings and provides a visual representation of the status and location of an ATM in question. 

### Main Features

- overal health of the ATMs network
- regional health of the ATMs network
- visual representation of ATMs status
- sliding side panel with ATMs list
- fiterable ATMs list
  - by status
  - by device type
  - easily extensible to other filters
- zoomable map with ATMs markers
  - dynamically changing map layers depending on the zoom level
- interactive ATMs markers
- geo region selection

The main part of the application is the `Map` component responsible for rendering the map and markers. It also handles the map events like zooming, panning and region selection. The component is using `leaflet.js` library to render the map, `leaflet-pip` library to handle the region selection and `react-leaflet-markercluster` library to cluster the markers.

### Tech stack and libraries

- [React](https://reactjs.org/) - for the user interface
- [Redux](https://redux.js.org/) - for managing application state
- [leaflet](https://leafletjs.com/) - for rendering the map
- [leaflet-pip](https://github.com/mapbox/leaflet-pip) - for checking if a marker is within a given region
- [react-leaflet-markercluster](https://www.npmjs.com/package/react-leaflet-markercluster) - for clustering markers and managing their visibility on zoom in/out
- [GeoJson](https://geojson.org/) - for storing map regional data
- [webpack](https://webpack.js.org/) - for bundling the application
