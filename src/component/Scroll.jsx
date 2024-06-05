import { useState, useEffect } from 'react';

const Scroll = () => {
  const [currentCard, setCurrentCard] = useState(0);

  // Data for cards
  const cardsData = [
    {
      imageUrl: 'https://cdn.pixabay.com/photo/2024/04/04/14/11/ai-generated-8675162_1280.jpg',
      title: 'COCA_COLA retreats',
      anchor:'Incredible accommodation for your team.',
      description: 'Incredible accommodation for your team. Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that. Aaaaallll '
    },
    // Add more card data as needed
    {
      imageUrl: 'https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_1280.jpg',
      title: 'DISNEY',
      anchor:'Incredible accommodation for your team.',
      description: 'Incredible accommodation for your team. Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that. BBBAAALLLL '
    },
    {
      imageUrl: 'https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_1280.jpg',
      title: 'RED BULL',
      description: 'Incredible accommodation for your team. Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that. CHALLLLLL '
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCard((prevCard) => (prevCard + 1) % cardsData.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-[210px] bg-blue-100 mb-2'>
      <div className="max-w-md  bg-teal-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-2 mt-2 ">
        <div className=" h-fit flex ">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className={`h-fit bg-blue-200  mt-3 absolute transition-opacity duration-500 ${
                currentCard === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className=" md:flex h-[180px]">
                <div className="md:shrink-0">
                  <img
                    className=" ml-4 mt-2  mb-4 w-[230px] object-cover rounded-xl h-[160px] "
                    src={card.imageUrl}
                    alt="Modern building architecture"
                  />
                </div>
                <div className="p-8">
                  <div className= "uppercase tracking-wide text-sm text-indigo-500 font-bold">{card.title}</div>
                  <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ">{card.anchor}</a>
                  <p className="mt-2 text-slate-500 mr-3 ">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scroll;
