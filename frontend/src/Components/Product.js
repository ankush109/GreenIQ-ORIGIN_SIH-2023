import React from "react";
import { AddToCart, GetUserCartQuery } from "../api/cart";
import { toast } from "react-hot-toast";

function Product({ id, name, price, image, description, category }) {
  const GetCartData = GetUserCartQuery();
  const Add = async (id) => {
    console.log(id);
    await AddToCart(id);
    toast.success("Added to cart");
    GetCartData.refetch();
  };
  return (
    <>
      <div className="bg-white sm:w-4/5  lg:w-1/3 h-full flex flex-col mx-4 my-4">
        <div className="flex flex-col ">
          <div className="m-3 p-2">
            <img
              className=" w-full  object-contain h-60"
              src={
                image ||
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBESDxIRERERDw8QDw8QEQ8PERIPDw8PGBMZGRgTGBgbIS0kGx0qIRgYJTclKi4xNDQ0GyM8PzoyPi0zNDEBCwsLEA8QHRESGjEhIyE0MTMzNTMzPjMzMTMzMT4zMzMzMzEzMzMzMzMzMzMxMzMzMzMzMzMzMzMxMzMzMzMzM//AABEIAKMBNgMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAgMEBQYBBwj/xABQEAABAgIDCQkOAwUHBQEAAAAAAQIDBAUREgYWITFSVJLR0gcXIkFRcZOisggTMjM2U2FzdIGRsbPTJELhFXKhwcMUQ0SChMLwJWKDo/Ej/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAMBAgUEBv/EADIRAAIBAgMEBwkBAQEAAAAAAAABAgMRBBIhBRMxURRBUmFxgfAVIjJCkaGxweHR8Qb/2gAMAwEAAhEDEQA/APZgAAAAAAADyzdQ3QY0jGSTk7LY1hHxYr227CO8FrUxV8danqZ85bpkJIl0cSGqqjXxJSGqtxo1zWItXpwkcWkTeyb5Fau6NTK/46J7mQU/2hvi0zn8TRg7Jpt7iT87NaUPYDe4k/OzWlD2Dp6HPuOP2hT7/XmZnfFpnP4mjB2Q3xaZz+Jowdk029zJ+dmtKHsBvcSfnZrSh7AdDn3B7Qh3+vMzO+LTOfxNGDshvi0zn8TRg7Jpt7mT87NaUPYFs3NpVzka2JNucuJEdDrXqA8HNa6fUPaEO/15mW3xaZz+JowdkN8Wmc/iaMHZPQoG4/I2f/0jzVrka+DUnoww8IpdyCjvPzunB+2ZU8bQi2uNuS0O+MZtXPO98Wmc/iaMHZDfFpnP4mjB2T0JdyKjvPzmnB+2JXclo7z85pwfti/aVDk/p/S+7qHn++LTOfxNGDshvi0zn8TRg7JvHblFHp/fzmnA+2NruWSHnpvpIH2yPadDk/p/Syw9V/8ATD74tM5/E0YOyG+LTOfxNGDsm23rJDz030kH7ZzetkPPTfSQPtlfalDk/p/S3RqvpmK3xaZz+JowdkN8Wmc/iaMHZNrvWyHnpvTg/bDetkPPTenB+2R7Vocn9P6HRqvpmK3xaZz+JowdkN8Wmc/iaMHZNrvWyHnpvTg/bDeukPPTenB+2WW06HJ/T+h0ar6Zit8Wmc/iaMHZDfFpnP4mjB2TZruXyHnpvTg/bEu3MJLijTWlC2BkMfQlpr9A6LV9Mx2+LTOfxNGDshvi0zn8TRg7Jo5jc5lW4okyvO+FsEF9w8sn95MaUPYNOjQ3qvFo4q1bdfHcqt8Wmc/iaMHZDfFpnP4mjB2SyvKlsuPpM2Dl5Utlx9JmwO6BU7jn6fDv9eZXb4tM5/E0YOyG+LTOfxNGDsljeXLZcfSZsBeXLZcfSZsE9AqdwdPh3+vMgwt0imWuRf7a91S12XMgq1fQvBPZ9zW7FaUlnrFa1szAc1sVGYGuRU4L0TirqXB6DyCduSl4cCLEa+OrocGJERFVlSq1qqlfBxYDTbgHj571Uv2niK1CVJrN1jqVeNW+XqPbgABYwAAAAAAAAAAAAAAAAD523QvKj/USX+w+iT55u+Su6lE5ZqQTsAnaSYSV4NHoNQpsNV4i2hSKcZKbLtTiGV9tUIOy1M+nsuo17zsUKS7uQ7/Z3chdxHMbgqrXkQa75zJzHDP/ANElwhfzOyOxb/MQZejHuXDwG5S4/cnGXkrLshNqYmFcblwq4hJGUWkdTIxm16+J92WkeS/fW/x3XO2hsyFHVavm/X97yc540ryP30LZnObOtU7DqvEOeIVw1EcUcy8YA940rhKuEK4pc6FEWrjlobVwlXFbl8o7bOWxq0crK3LZR+0CuGrRyssnYjKOK44qiKwrGwmTlExWIqFTNy5bKoxGbWhu7OxsoNanFisLGpEz0RlQhUJ0zDITkPaUayqRuePxNB0p2EnUQKiyoqQWI6tfBTGWq1Y04ucnZIVSpyqSUI8WRpyjl/Z05EdibJTSpz96cV/c/wDj571UDtONbdKiNo2camBEkZpP/Q4yO4B4+e9TL9tx5qGMeKnKXUrWPRdGWHjGK5O57eAAPFgAAAAAAAAAAAAAAAAfPV3PlYz2uj/nDPoU+eru/KtvtdH/ANMVW+B+D/BeH+Hs9Y3GfZaqpjOK4RE4TVTlPI5jTUdSLWctCVwLUolXEM6khy0COGbQWihbKP2xSPI1s7aK3IyEq2NPcNo85EeRchQ1OucNq4SrxCuAaoilcctCFcJtEDFEctAjhq0dRxWwZR5FAbaopVAix2s4qiVU4rhkAOq4Q9TiuEOcd1LRkOJHmGlZFbhLSIpAjMrU9fsmvf3Wec2xh/dzHJSXWI9GpymrgQmw2o1PepDouV72y0vhu/ghLe8yttbS3s91B+7H7sbsvBbuGeXxP7Irbpnf9PnPYpr6TjLbgHj571Uv23Giukd+AnPYpn6TjPdz/wCPnvVS/aec+yZXU/L9nRj1Zx8z24AA2TOAAAAAAAAAAAAAAAAA+ebvfKtvtUh/TPoY+ebvvKpPapD+mJr/AAS8H+BkOPmj1xXBaI6vC2ePNrIOvajseBeJSJEarcfuXiUftHLaVVLhQhstG6IquOWxUaDVhbi5COribD42Y9aOo4jWwthlL5STaEucM2xLnlcoKAtXiVeNK8SryLF1EfVwlXjCvOK4ixdRHrYI8jq8QsclRbLZCwhuFqpBl41akq2Q1qKlGzFOcNucJc8bc8bCJGUU54hzxp0QQ952QiS4i1eSZCWtvtL4LcPOpBhIrnIiYVVajQQmIxiNTix+lTqli3Qg8r1ZyYmjGdkxx7hh7hURxHc4x27jIRK+6N34Gc9jmfpOKLuf/Hz3qpftPLm6JfwM37HMfTcU3c/+PnvVS/aebexuE/L9mdtJWcfM9uAANwygAAAAAAAAAAAAAAAAPnjdB8qU9pkPlDPoc+eN0Hyp/wBRIfKGJr/BLwf4GU+K8UenK85bI6xKlqXAvIuBQ74ePsekyEi2Fsj2ztsiwZCQj+JcXyG4zPenEN2xTIlWBcXyJWhGW2qIkRqpiw/Ma74To0PkIkSGi48C8qFx0XdCbZxXjMRqt5uVMQ0rycpdIfV4lXjCvOK8MpdIftiVeMK8SrychdIciRBlXjT4g33wZGAyxYS0ThE+2UkGJwkLFHipw1FTWo8+IMveIc8YiRBsIFUhx0QSsQjq8dlWK97WpjcuPkTjU64qyuyWust6IgYFiLzN/mpZvcIRqNajUwI1EROYQ9xmVKjnJs4n7zuce4Ze4HuGHOKjoxIN0C/gZv2SY+m4q9wDx0/6qW7TyfTzvwUz7LMfTcQO5/8AHT/qpbtPN3Y60n5fsytqqzh4SPbgADaMcAAAAAAAAAAAAAAAAD55u/8AKpvtMh/TPoY+ed0DyqT2mj/lDE1/gfg/wMp8fNHqUWG12NK/mnvIMaVcmFnCTkXwv1LC0JVTx6Zvwm48Cnt//DqPJ8xAa/GmHicmP9StjwXNx4W8Tkxe/kGJXOuE4y04MdSIKtkRrxbXhlLOJMhRPyri4l5AiwyMjiTAiWksrj4l5U5CLCpLL7yIzkIsWCi4uCvJxfoWEWGRXIWQyMkyueitWpUqG1eT3oipUqVpyKQo0BUwtw+jj/UbHXQchtXjbnjauGnvGqBdC3PEWxtXHLQxRGIeY/CWMOJWiFQjiXAfgKyiUmrolueMPiCXvGHPJjArYcV5fUHAqasRcbuC391Fwr71+RQSkJYj2sT8y4V5G41X4VmtSprUa1KmtRGonIiJUgvEytHKuv8AAms9Mo454y94l7xlzzisLjA694y5wlzxtXFlE6IxIlOL+CmfZpj6biJ3P/jp/wBVLdp5KpeG5ZKbXibKzCqq4vFuwc5G7n/x0/6uW7Tzb2UrKXkYm2LZoLuZ7aAAbBigAAAAAAAAAAAAAAAAfPO6F5VJ7RIfKGfQx877onlR/wCeR+UMVWV4Pwf4GU+K8Uen2wtkbvh3vh5DI0egsSLQl2H0ovEuFFQZSIKR4E2IczKVcJnvbx+7UREcW9ZFmZa1wm4HcfI79RilzOinV6pEVrxxriPXUtS4FTiXGii2vJaGtFix9pvpTGgxFYNQotla/inKhLdUqVpiUrwOa2R9xXvQjuJsRpEe0ujqhIiRoaO9C8qfz5Svjw1bj9y8Slm8aeiKlSpWnIo+Emh6VyqrCsdjy9WFMLf4oR6zpWuoC6xyE8YrFI4LASHPGnOOOccgsV72tbjc5Gp6PT7sZKWhBf0BAqa6KuN1bGfuouFfeqVf5S0e8ZYiMajW4GtajU5kSobe8zZvPJyOb4ncW+IMviDb4g2rwURyiLVxJlpZXcJ2Bv8AF3N6PSdlpb8zk5mL/PUTLZDduAudTqiQboERJCbREqRJOZqRPVOKXuf/AB0/6uV7Ty0ugd+Bm/ZJn6Tir7n/AMdP+rle0819kcJ+RhbSVnHwZ7aAAbJlAAAAAAAAAAAAAAAAAfO26QtV0y+iLIr1YZ9EnznumeUrvWSfZYCV5JMG7RbXUbmHNIvGSEeZ5ryTBm1THhQri9hJ+9Rfky2E258tdeaLlHimvIcOOjsS+4WjzzNbDSpycZKzPSUqkKsc0HdMmteLRSG2IPNecriWaOTUtbS03wk6ycnOVtouGuIVIQPzt96ejKLRfUy9Kp8rIqPJcrG/KvHi5+QrbQtry7iOlC6LKI0jRGj8OJabXx4l5xD0KoTBtOxBiNI70JkRpGe0bFnZCRGVSNHl68LcC5PLzEp6CFHJtPQdxKwCZHhWsKYHdohr8B6eYW9DjnFvQMHC6IvFwGc6+EvwqT3qVCIqqiIlaqqIiJxryGngQ0ZDa1PypUq8rsar8axdeVo25lJPSw+95HiPB7xhVrORRCKO2qywlpazwnY+JMn084mWgWOE7wuz+o8ryJPqQupO+iHVeIc8aV4hXlFEWokSnl/BTXssz9JxB7n/AMbP+rlu08k0678HNezTH01I3c/+Nn/Vy3aebOyuEvIyNqqzj4M9tAANcyAAAAAAAAAAAAAAAAAPnPdO8pH+sk+yw+jD5y3UPKN/78n2GEw+NES+BlwjxaPIyPFI43zDykpsRUxE+BN14HaWsqEeLR5zYnC08RHLUXg+teB0YXFVcNLNTfiup+K/a1L+0ONeVEtOWcDsLeXJ1lgjuTCnKeNx+z54eVpap8Hz/wAfd92e0wONp4qGaOjXFda/1d/4ehPhvHKyEx5Ia8ynE6ZRKubhWXKn5Vwt5uQZRxZz8O0yvjbwk5uNP+chUoo+OqOqnLNHXiTZaLZdhxLgXWTXoVLHFhLvtNq40we7iKSQqrHXMIehGehLehHegItCREe0YehLegxEQdFnVGRHUajwrSVp4SdZOTnH3INjFpqMdmJoiDaiWlxMSv8Azr4P819xdPUiST2ojkRKnK60v/dgRK/4Drni6rzSuc7Tucc4my0GzhXwuz+oiWg1cJ3hcSZKcvP/AM5nnOFNlJyvojrnCVeIc4ac4ixCQ6rxDnjTnjbnk5S1iPTTvwkx7NH+monuf/Gz/q5btRBumHfhZj2aP9NRzuf/ABs/6uW7UQ19mLSXl+zF2vxh4P8AR7aAAahjAAAAAAAAAAAAABn1np+FX36WZHbWtT5OteDXgra51qurkRSNGuwhswPhRIS8kViw161RR1EuIxU5Pgak+ct1drkp6O9tVbElnJXirSG1T2BLtYS4kRfemsyN0FHUbPTLpqMsw2I9jGuSFFhsYqNSpFqc1Vrq9PERvY3LbiduB5h+3JrJg6K6zv7dmsmFou1m8vVojLnOmg7By9WiMuc6aDsDumy7TE9BXZRhf27N5MLRdrO/t6byYOi7Wbq9WiMuc6aDsHL1aIy5zpoOwHTZdph0FdlGHS6CbyYOi7WPwrqp5iVI2AqelqrV1jZXq0RlznTQdgL1aIy5zpoOwLq4hVY5Zu6GUcNKlLPTVn3GRS7CeyZfRXaFpdpSCflltBdo1d6tD5c508HYC9Wh8uc6eDsHI6OGfGKOp1cU/mf2/wAMrfvSGRLdG7aIt9E5kwPgus2l6tD5c508HYC9Wh8ud6eDsAqOGXCKBVsVHhJmMS6mdyYGiusch3XzzVrRsv72LtGsdcnRSvSqJNth2eFXFhOfar4uBVUOpcjQ3np7pIGwDo4d/KTv8U18bMqt1VJK1Hd5hWVqqckF9la1VEqW1yoqe45EulpJFVroMNHJjRYL0VMFfLyKhuINC0axne2Tc+kOyrbFqWc2yuNMLMWFcHpFOoqj1rrnKQwoqLwpXCi4FTwOf4rykbnD9hAquJXzMwD7p59ERXQoLUVEVFWG5EVFRHIqYeNFReZRpbqZ3JgaK6zeTFzlFREa2JNUg9sO1YRz4C2bVVdXA9Cc1SIhHvRobz87pwNgtucP2UTv8V1TfryMSt005kQNFdYm+ObyIGius2kC5SiktW4k27h8BWRYTeBUnhVsx114vQLvVofLnOng7BO7w/ZRPSsZ239jEtulnEWtGQdFdY626udRUWxLrVxK1avmbG9Wh8uc6eDsBerQ+XOdPB2CHSw7+VA8RjH87+xlFuzn8iX0HbQhbsZ/Jl9Bdo116tD5U500HYC9WiMuc6aDsEbjDdlfcrvsV2n9jHrddPZMvorrBbrJ7JgaK6zYXq0RlznTQdgL1aIy5zpoOwTucN2UG/xfbZjVuqncmBortHFupncmBorrNnepRGXOdNB2AvUojLm+mg7AbrD9lE7/ABfbf2MPHuhm3sexzYNl7HMdUiotla0WrD6TebgcNWxZ9Fx97lV60TUN3qURlTnTQdg0Fyv9go1Yqy3fXLHSGj1jxGPqRlqyjbKJV4ajIbqCtFWFVN/U+N3semgZNbtYKY6vimseg3VI/wAXLxo1eLvTHPT4pgQYqsWJdGSNMBSysxOvisV0GFAl63W2xVV0wqVLVZsOVqYasfFWXRdO4tqwAAEkAAAAAJdiOAAFdHoaWirXEgsiLyurUjRLlKPzSF8F1gBFguxN6VHZpC62sL0qOzSF1tYAWyrkGZ8wvSo7NIXW1helR2aQutrAAyrkGZ8wvSo7NIXW1helR2aQutrAAyrkGZ8wvSo7NIXW1helR2aQutrAAyrkGZ8wvSo7NIXW1nb0qOzSF1tYAGVcgzPmcvSo7NIXW1nb0qOzSF1tYAGVcgzPmF6VHZpC62s5elR2aQutrAAyrkGZ8wvSo7NIXW1nb0qOzSF1tYAGVcgzPmcvSo7NIXW1nb0qOzSF1tYAGVcgzPmdvSo7NIXW1helR2aQutrAAyrkGZ8wvSo7NIXW1helR2aQutrAAyrkGZ8wvSo7NIXW1helR2aQutrAAyrkGZ8wvSo7NIXW1nL06PzWH1tYAGVcgzPmF6lH5pC+C6xUO5mQT/CwdEACyDM+ZOgUdBheLhtZ+7WhNQAKoDoABIAAAAH/2Q=="
              }
            />
          </div>
          <div className="items-center  m-4 flex flex-col">
            <h1 className=" text-2xl my-2 font-bold">
              {name.length > 20 ? name.slice(0, 20) + "..." : name}{" "}
            </h1>
            <div class="flex items-center">
              <p class="ml-2 bg-green-600 p-2 rounded-lg text-sm font-bold text-gray-900 dark:text-white">
                4.5{" "}
                <span class="text-sm font-normal text-gray-600 dark:text-gray-400">
                  ⭐
                </span>
              </p>
              <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
              <a class="text-sm font-medium text-gray-900  hover:no-underline dark:text-black">
                73 reviews
              </a>
            </div>

            <p className=" m-2 text-xl font-medium">₹{price}</p>
            <p className=" m-2">{description}</p>
            <p className="text-green-500 font-bold">Get Free Delivery </p>
            <button
              onClick={() => {
                Add(id);
              }}
              className="bg-blue-300 w-1/2 p-2 m-4 rounded-2xl"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
