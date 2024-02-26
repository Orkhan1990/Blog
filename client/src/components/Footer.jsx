import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';


const FooterCom = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full">
        <div >
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              {"Orkhan's"}
            </span>
            Blog
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:max-w-xl sm:mx-auto sm:mt-4 ">
          <div>
            <Footer.Title title="About" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://www.100jsprojects.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                100 JS Projects
              </Footer.Link>
              <Footer.Link href="/about">{"Orkhan's"} Blog</Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div>
            <Footer.Title title="Follow Us" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://www.100jsprojects.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </Footer.Link>
              <Footer.Link href="/about">Discord</Footer.Link>
            </Footer.LinkGroup>
          </div>


          <div>
            <Footer.Title title="Legal" />
            <Footer.LinkGroup col>
              <Footer.Link
                href="https://www.100jsprojects.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Footer.Link>
              <Footer.Link href="/about">Terms & Conditions</Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Orkhan's Blog™" year={new Date().getFullYear()} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>


      </div>
    </Footer>
  );
};

export default FooterCom;
