function Card({ children }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-2 hover:shadow-xl">
      {children}
    </div>
  );
}

export default Card;