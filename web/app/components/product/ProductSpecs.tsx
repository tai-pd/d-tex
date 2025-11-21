interface Specification {
  key: string;
  value: string;
}

interface ProductSpecsProps {
  specifications: Specification[];
}

export default function ProductSpecs({ specifications }: ProductSpecsProps) {
  if (!specifications || specifications.length === 0) {
    return null;
  }

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4">Thông số kỹ thuật</h2>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            {specifications.map((spec, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 font-semibold text-gray-700 w-1/3">
                  {spec.key}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
