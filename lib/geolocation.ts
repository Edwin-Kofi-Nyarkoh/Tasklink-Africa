export interface Location {
  latitude: number
  longitude: number
  accuracy?: number
}

export interface Address {
  street?: string
  city?: string
  state?: string
  country?: string
  postalCode?: string
  formattedAddress?: string
}

export async function getCurrentLocation(): Promise<Location> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
      },
      (error) => {
        reject(new Error(`Geolocation error: ${error.message}`))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  })
}

export async function reverseGeocode(lat: number, lng: number): Promise<Address> {
  try {
    // Using a free geocoding service (you can replace with Google Maps API)
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.OPENCAGE_API_KEY}`,
    )

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const result = data.results[0]
      const components = result.components

      return {
        street: components.road || components.street,
        city: components.city || components.town || components.village,
        state: components.state || components.region,
        country: components.country,
        postalCode: components.postcode,
        formattedAddress: result.formatted,
      }
    }

    throw new Error("No results found")
  } catch (error) {
    console.error("Reverse geocoding error:", error)
    throw new Error("Failed to get address from coordinates")
  }
}

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in kilometers

  return distance
}
