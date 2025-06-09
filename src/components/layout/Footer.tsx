import React from "react";
import logo from "@/assets/icons/Logo.svg";

import facebookIcon from "@/assets/images/facebook.png";
import instagramIcon from "@/assets/images/instagram.png";
import telegramIcon from "@/assets/images/telegram.png";
import youtubeIcon from "@/assets/images/youtube.png";

import appStoreIcon from "@/assets/images/appStore.png";
import googlePlayIcon from "@/assets/images/googlePlay.png";

import qrcodeIcon from "@/assets/images/qrcode.png";
import Image from "next/image";
import { LanguageSwitcher } from "../shared";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-main-light-gray">
      <div className="container mx-auto">
        <div className="flex justify-between pt-12 pb-10 mb-10 border-b border-[#919DA63D] md:block">
          <Image src={logo} alt="moomkin" width={183} className="md:mb-8" />
          <div className="flex gap-6 w-[62%] md:flex-col md:w-[90%] md:gap-6">
            <div>
              <h6 className="mb-1 font-bold text-lg leading-6">1080</h6>
              <p className="text-[#85919E] font-normal text-sm leading-5">
                Savollar va takliflarga javob berish uchun ishonch telefon
                raqami. Qo‘ng‘iroq qilish bepul.
              </p>
            </div>
            <div>
              <h6 className="mb-1 font-bold text-lg leading-6">
                @moomkinsupport
              </h6>
              <p className="text-[#85919E] font-normal text-sm leading-5">
                Botda mavjud bo‘lgan imkoniyatlar haqida qisqacha izoh yozib
                ketish kerak.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-13.5 md:block md:mb-16">
          <div className="flex gap-6 items-center">
            <Image src={qrcodeIcon} alt="download our app" width={120} className="md:hidden"/>
            <div className="md:mb-8">
              <div className="flex gap-3 mb-4">
                <Image src={googlePlayIcon} alt="Google play" width={162} />
                <Image src={appStoreIcon} alt="App store" width={144} />
              </div>
              <p className="text-[#85919E] font-normal text-sm leading-5 w-[65%] md:w-[70%]">
                Telefoningiz kamerasi orqali QR kodni skanerlab mobil ilovani
                yuklab oling
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link href="https://instagram.com/moomkin.uz" target="_blank" >
              <Image src={instagramIcon} alt="Instagram" width={56} />
            </Link>
            <Link href="https://facebook.com/moomkin.uz" target="_blank" >
              <Image src={facebookIcon} alt="Facebook" width={56} />
            </Link>
            <Link href="https://t.me/moomkinuz" target="_blank" >
              <Image src={telegramIcon} alt="Telegram" width={56} />
            </Link>
            <Link href="https://www.youtube.com/@moomkinuz" target="_blank" >
              <Image src={youtubeIcon} alt="You Tube" width={56} />
            </Link>
          </div>
        </div>

        <div className="flex justify-between items-center mb-12 md:mb-8 md:text-sm">
          <p>© 2025 moomkin.uz · Barcha huquqlar himoyalangan </p>
          <LanguageSwitcher className={"md:hidden"}/>
        </div>
      </div>
    </footer>
  );
}
