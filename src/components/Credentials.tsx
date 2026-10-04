import React from 'react';

export default function Credentials() {
  return (
    <div className="creds bg-[#faf9f8] border-y border-[#e6e3de]">
      <div className="creds-in max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4">
        <div className="cred py-3.5 pr-4 border-r border-[#e6e3de]">
          <div className="k text-[19px] font-extrabold text-[#141416] tabular-nums">
            5.0<span className="text-[#d32d1f]">★</span>
          </div>
          <div className="v text-[12.5px] text-[#6a6864] mt-0.5 font-medium ml-2 ">Rated on Google</div>
        </div>
        <div className="cred py-3.5 px-4 border-r border-[#e6e3de]">
          <div className="k text-[19px] font-extrabold text-[#141416] ml-2">Same day</div>
          <div className="v text-[12.5px] text-[#6a6864] mt-0.5 font-medium ml-2">Slots until midnight</div>
        </div>
        <div className="cred py-3.5 px-4 border-r border-[#e6e3de]">
          <div className="k text-[19px] font-extrabold text-[#141416] ml-2">From £89</div>
          <div className="v text-[12.5px] text-[#6a6864] mt-0.5 font-medium ml-2">Minimum load</div>
        </div>
        <div className="cred py-3.5 pl-4">
          <div className="k text-[19px] font-extrabold text-[#141416] ml-2">Licensed</div>
          <div className="v text-[12.5px] text-[#6a6864] mt-0.5 font-medium ml-2">Registered waste carrier</div>
        </div>
      </div>
    </div>
  );
}
