// Approximate state capital coordinates [latitude, longitude].
// Used to suggest the nearest state from the visitor's device location.
// Nearest-capital is an approximation: near state borders it can pick the
// neighbouring state, so the result is always a suggestion the visitor can change.
const CAPITALS: Record<string, [number, number]> = {
  'Abia': [5.525, 7.4906],
  'Adamawa': [9.2035, 12.4954],
  'Akwa Ibom': [5.0377, 7.9128],
  'Anambra': [6.21, 7.07],
  'Bauchi': [10.3103, 9.8439],
  'Bayelsa': [4.9267, 6.2676],
  'Benue': [7.7337, 8.5214],
  'Borno': [11.8333, 13.15],
  'Cross River': [4.9757, 8.3417],
  'Delta': [6.198, 6.734],
  'Ebonyi': [6.3249, 8.1137],
  'Edo': [6.335, 5.6037],
  'Ekiti': [7.621, 5.221],
  'Enugu': [6.4584, 7.5464],
  'FCT Abuja': [9.0765, 7.3986],
  'Gombe': [10.2897, 11.1673],
  'Imo': [5.485, 7.035],
  'Jigawa': [11.759, 9.339],
  'Kaduna': [10.5105, 7.4165],
  'Kano': [12.0022, 8.592],
  'Katsina': [12.9908, 7.6018],
  'Kebbi': [12.4539, 4.1975],
  'Kogi': [7.802, 6.733],
  'Kwara': [8.4966, 4.5421],
  'Lagos': [6.5244, 3.3792],
  'Nasarawa': [8.49, 8.52],
  'Niger': [9.6139, 6.5569],
  'Ogun': [7.1475, 3.3619],
  'Ondo': [7.2526, 5.1931],
  'Osun': [7.7827, 4.5418],
  'Oyo': [7.3775, 3.947],
  'Plateau': [9.8965, 8.8583],
  'Rivers': [4.8156, 7.0498],
  'Sokoto': [13.0059, 5.2476],
  'Taraba': [8.893, 11.359],
  'Yobe': [11.747, 11.9608],
  'Zamfara': [12.1704, 6.6641],
}

const MAX_KM = 350 // farther than this from every capital: probably outside Nigeria

function km(aLat: number, aLng: number, bLat: number, bLng: number) {
  const rad = Math.PI / 180
  const dLat = (bLat - aLat) * rad
  const dLng = (bLng - aLng) * rad
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(aLat * rad) * Math.cos(bLat * rad) * Math.sin(dLng / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

/** Returns the nearest state name, or null if the point is not near Nigeria. */
export function nearestState(lat: number, lng: number): string | null {
  let best: string | null = null
  let bestKm = Infinity
  for (const [name, [cLat, cLng]] of Object.entries(CAPITALS)) {
    const d = km(lat, lng, cLat, cLng)
    if (d < bestKm) { best = name; bestKm = d }
  }
  return bestKm <= MAX_KM ? best : null
}
