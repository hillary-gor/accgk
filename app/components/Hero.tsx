export function Hero() {
  return (
    <div className="pt-4">
      <div className="px-[20px] text-[32px] text-center font-bold leading-[40px]">
        <h1 className="text-center text-[32px] leading-[40px] font-medium text-[#3F96E6]">
          Association of Certified Care Givers Kenya
        </h1>
        <p className="text-center pt-6 font-normal text-[#136dc2]">
          Empowering caregivers with training, certification, and a strong
          professional network. Join us in raising caregiving standards across
          Kenya.
        </p>
        <div className="flex w-full pt-6">
          <button className="bg-[#AB056A] w-1/2 py-4 px-8 text-white font-normal rounded-[10px]">
            Learn More
          </button>
          
          <button className="w-1/2 text-[#AB056A] py-4 px-8 font-normal rounded-[10px]">
            Membership
          </button>
        </div>
      </div>
    </div>
  );
}
