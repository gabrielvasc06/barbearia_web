import {
  useEffect,
  useRef
} from 'react'

import * as maptilersdk
  from '@maptiler/sdk'

import '@maptiler/sdk/dist/maptiler-sdk.css'

const MAPTILER_KEY =
  import.meta.env.VITE_MAPTILER_KEY

const BARBEARIA_LOCATION = [
  -34.903136716532146,
  -8.051554384295551
]

export function Map() {
  const mapContainer =
    useRef(null)

  const map =
    useRef(null)

  useEffect(() => {
    if (
      !MAPTILER_KEY ||
      !mapContainer.current
    ) {
      return undefined
    }

    maptilersdk.config.apiKey =
      MAPTILER_KEY

    map.current =
      new maptilersdk.Map({
        container:
          mapContainer.current,

        style:
          maptilersdk
            .MapStyle
            .STREETS
            .DARK,

        center:
          BARBEARIA_LOCATION,

        zoom: 15
      })

    new maptilersdk.Marker()
      .setLngLat(
        BARBEARIA_LOCATION
      )
      .addTo(map.current)

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  if (!MAPTILER_KEY) {
    return (
      <p className="map-error">
        Chave do MapTiler não configurada no .env
      </p>
    )
  }

  return (
    <div
      ref={mapContainer}
      className="footer-map"
    />
  )
}