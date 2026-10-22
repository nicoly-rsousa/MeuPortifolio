/** Título numerado com linha à direita, ex.: "01. Sobre mim ———". */
export default function SectionTitle({ index, children }) {
  return (
    <h2 className="numbered-heading">
      <span className="numbered-index">{index}.</span>
      {children}
    </h2>
  );
}
