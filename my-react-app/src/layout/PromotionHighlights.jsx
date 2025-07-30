function PromotionHighlights() {
  return (
    <div className="px-4 py-8 lg:px-16 md:px-8">
      <h2>Ưu đãi hấp dẫn</h2>
      <div className="h-4"></div>
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 gap-4 md:px-7">
        <img
          className="rounded-xl w-full aspect-[5/3] object-cover"
          src="/promotionhighlight(1).jpg"
          alt=""
        />
        <img
          className="rounded-xl w-full aspect-[5/3] object-cover"
          src="/promotionhighlight(2).jpg"
          alt=""
        />
        <img
          className="rounded-xl w-full aspect-[5/3] object-cover"
          src="/promotionhighlight(3).jpg"
          alt=""
        />
        <img
          className="rounded-xl w-full aspect-[5/3] object-cover"
          src="/promotionhighlight(4).jpg"
          alt=""
        />
      </div>
    </div>
  );
}

export default PromotionHighlights;
