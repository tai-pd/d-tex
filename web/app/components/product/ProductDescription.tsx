interface ProductDescriptionProps {
  content: any;
}

export default function ProductDescription({ content }: ProductDescriptionProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <h2 className="text-2xl font-bold mb-6">Mô tả sản phẩm</h2>
      <div className="prose max-w-none">
        {/* TODO: Render rich text content from Payload CMS */}
        <p className="text-gray-600">Thông tin mô tả sản phẩm sẽ được hiển thị ở đây.</p>
      </div>
    </div>
  );
}
