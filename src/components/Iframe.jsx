export function Iframe({ path }) {
  const src = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://blueprints.sublayer.com';
  return (
    <iframe src={`${src}/${path}`} width="100%" height="400px" title="Rails Content"></iframe>
  )
}
