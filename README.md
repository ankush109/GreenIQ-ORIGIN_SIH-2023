# GreenIQ - An E-learning Platform for Rural Areas
### PROJECT FOR SMART INDIA HACKATHON 2023
### Developed by Team Cyber Elites
### All Documentation Related to Project GreenIQ:
 - [Use-Case Diagram](https://drive.google.com/file/d/11qCXCMgyq33itaPXaRwQx7hqOhkgTZ2y/view?usp=sharing)
 - [Data Flow Diagram (DFD)](https://drive.google.com/file/d/1ZbHHs-9YZClF7W5be4G5Db9tabNy_aEE/view?usp=sharing)
 - [Abstract](https://drive.google.com/file/d/1Sp-soAIwcrm0t3FwzlQ3YxjUCQiIRz9c/view?usp=sharing)
 - [Idea Summary Document](https://drive.google.com/file/d/1le1LZ2IDNic68kk3IwkgK9hCJqGZkMSp/view?usp=sharing)
 - [Extended Presentation](https://drive.google.com/file/d/1xNwzGtiieqZwzYC5U4W0HB58LIma95Yh/view?usp=sharing)
 - [Short Presentation (SIH'23 Format)](https://drive.google.com/file/d/1cwVDkRmixy_FCWVtnHVEghMNNnBtruZz/view?usp=drive_link)
 - [User Manual/Booklet](https://drive.google.com/file/d/1fvZosK-_YNBq-w5U0tY9OKI5UwF2h0t1/view?usp=sharing)
### How to Run:
To start the project do the following:
 - Clone this repository.
 - Open terminal in **MS Visual Studio Code** and run.
 - Make sure you are in the file where you can see both Front-end and Back-end.
#### REQUIREMENTS:
 - Make sure **node.js** is installed.
 - Install **Postgres** as we will be using it locally.
 - The database will migrated later on to **MongoDB Atlas**.
#### PRIMS Commands:
Only if you are working on Back-End and have made some changes to the `schema.prisma` file.

    npx prisma migrate dev
#### For the Back-End:

    cd backend
    npm install
    npm run dev
#### For the Front-End: 

    cd frontend
    npm install
    npm run dev
