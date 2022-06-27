import React, { useRef, useState } from "react";
import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";

function TweetBox() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState("");
  const { data: session } = useSession();
  const [imageUrlBoxIsOpen, setimageUrlBox] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!imageInputRef.current?.value) return;
    setImage(imageInputRef.current.value);
    imageInputRef.current.value = "";
    setimageUrlBox(false);
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 object-cover rounded-full mt-4"
        src={session?.user?.image || "https://links.papareact.com/gll"}
      />
      <div>
        <div className="flex flex-1 items-center px-2">
          <form className="flex flex-1 flex-col">
            <input
              className="h-24 w-full text-xl outline-none placeholder:text-xl"
              type="text"
              placeholder="What's Happening?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center">
              <div className="flex flex-1 space-x-2 text-twitter">
                <PhotographIcon
                  onClick={() => setimageUrlBox(!imageUrlBoxIsOpen)}
                  className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                />
                <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              </div>
              <button
                disabled={!input || !session}
                className="bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40"
              >
                Tweet
              </button>
            </div>
            {imageUrlBoxIsOpen && (
              <form className="mt-5 flex rounded-lg bg-twitter/80 py-2 px-4">
                <input
                  ref={imageInputRef}
                  className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                  type="text"
                  placeholder="Enter Image URL"
                />
                <button
                  type="submit"
                  onClick={addImageToTweet}
                  className="font-bold text-white"
                >
                  Add Image
                </button>
              </form>
            )}
            {image && (
              <img
                className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
                src={image}
                alt=""
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
