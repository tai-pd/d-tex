interface CategoryHeaderProps {
  name: string;
  description?: string | null;
}

export default function CategoryHeader({ name, description }: CategoryHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-4">{name}</h1>
      {description && (
        <p className="text-lg text-gray-600">{description}</p>
      )}
    </div>
  );
}
