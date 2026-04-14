export enum LoaderSize {
  small = 'small',
  normal = 'normal'
}

export default function Loader({ size }: { size: LoaderSize }) {

  const sizeMap = {
  small: 'w-4 rounded-md',
  normal: 'w-12 rounded-full'
}
  return (
    <div
      className={`border-t-2 border-b-2 ${sizeMap[size]} aspect-square border-primary animate-spin`}
    />
  )
}