import { useEffect, useRef } from 'react'
import * as maptilersdk from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css'

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY

// Coordenadas da barbearia (ajuste depois: -46.633, -23.5505 = centro de SP)
const BARBEARIA_LOCATION = [-34.903136716532146, -8.051554384295551]

maptilersdk.config.apiKey = MAPTILER_KEY

export function Map() {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current || !MAPTILER_KEY) return

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS.DARK,  // Estilo do mapa (pode ser alterado, tanto para claro quanto para escuro)
        center: BARBEARIA_LOCATION,
      zoom: 15
    })

    new maptilersdk.Marker()
      .setLngLat(BARBEARIA_LOCATION)
      .addTo(map.current)
  }, [])

  if (!MAPTILER_KEY) {
    return <p className="map-error">Chave do MapTiler não configurada no .env</p>
  }

  return <div ref={mapContainer} className="footer-map" />
}