interface HighlightCardProps {
  url: string;
  title: string;
  text: string;
}

export const HighlightCard = ({ url, title, text }: HighlightCardProps) => (
  <div
    style={{
      height: 150,
      display: "flex",
      flexDirection: "column",
      padding: 15,
      border: "3px solid black",
    }}
  >
    <div
      style={{
        height: "25%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 25
      }}
    >
      <span style={{ maxWidth: "60%", fontWeight: "bold" }}>{title}</span>
      <a style={{ maxWidth: "40%" }} href={url}>{url}</a>
    </div>
    <div style={{ height: "75%" }}>{text}</div>
  </div>
);
