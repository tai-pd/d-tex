interface ProductHeaderProps {
  name: string;
  code?: string | null;
  brand?: string | object | null;
}

export default function ProductHeader({ name, code, brand }: ProductHeaderProps) {
  const brandName = typeof brand === 'object' && brand !== null && 'name' in brand
    ? (brand as { name: string }).name
    : typeof brand === 'string'
    ? brand
    : null;

  return (
    <div className="mb-6">
      {brandName && (
        <div className="text-blue-600 font-semibold text-lg mb-2">{brandName}</div>
      )}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
      {code && (
        <p className="text-gray-600">Mã sản phẩm: <span className="font-semibold">{code}</span></p>
      )}
    </div>
  );
}
