export function getAssetURL(id) {
  if (!id) return null;
  return `http://localhost:8055/assets/${id}`;
}
