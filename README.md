1601 Washington Ave, Suite 300, Miami Beach, FL 33139

QArté

**Group Members:**  

[Martin Kolev, Em](mailto:martin.kolev@blankfactor.com)[a Kyuchukova, Martin](mailto:ema.kyuchukova@blankfactor.com)[ Konov](mailto:martin.konov@blankfactor.com)

**Introduction:** 

**Purpose:**  

QArté is a website designed to facilitate the donation process for street artists. By providing a platform for artists to showcase their work and receive contributions from viewers, QArté aims to address the challenges faced by street artists in receiving donations. 

**Target Audience:***  

Street artists and their viewers. 

**Product Scope:**  

QArté allows street artists to create accounts, showcase their arts through personalized pages with QR codes, and receive donations through various payment methods. 

**General Description:** 

**Business Requirements:**  

QArté aims to provide street artists with a user-friendly platform to increase their visibility, engage with their audience, and simplify the donation process. **User Needs:**  

- Artists need the ability to create accounts easily. 
- Artists need customizable pages with bio, pictures, and QR codes. 
- Viewers need an easy way to access artist information and make donations. 

**Product Limitations and Constraints:**  

- Assumptions about internet connectivity for users. 
- Limitations on supported payment methods. 

**Functional Requirements:**  

(What will the user be able to do using your software?)

**Feature 1: Artist Registration and Profile Creation** 

User story: 

As an artist, I want to be able to create an account using Google authentication or a simple registration process. 

**Acceptance Criteria:** 

1. When accessing the application for the first time, the artist should see a

   login option on the navigation bar of the application. 

2. The artist should have the ability to choose to register. If they do, they should be redirected to the registration page. 
3. The artist should have the ability to choose between registering using a registration form or their Google account. 
4. If the artist chooses to register using their Google account, they should be redirected to the Google authentication page to log in using their existing credentials. 
5. If the artist chooses to register using the register form, they should be presented with a form, containing fields such as email,username, password , picture, and payment preferences and payment information. 
6. After a successful registration, the artist should be redirected to the login page, where they can login with the newly created account. 
7. On the login page, the artist should find fields to enter their username/email and password. 
8. Upon entering the correct username/email and password, the artist should be able to proceed by clicking a login button. 
9. The application should verify the entered credentials for validity, and upon successful login, the user should be redirected to their home page. 
10. If the entered credentials are incorrect, the user should see an error message, indicating that their login attempt has been unsuccessful. 
11. The login process should securely handle the user’s password, ensuring the confidentiality of their personal information. 
12. After a successful login, the artist should have access to the full features of the application. 
13. The user should have the option to log out of their account. 

**Feature 2:  Page Creation and QR Code Generation** 

User Story: 

As an artist, I want to create one or more pages describing my arts, each with a unique QR code for easy viewer access. 

**Acceptance Criteria:** 

1. On the artist’s home page, the artist should find a list, containing the names of all of their pages. 
1. Under the list of pages, there should be an option, allowing the artist to create a new page. 
2. If there are no created pages yet, instead of the page list, the artist should see only the option to create a new page.
3. After choosing the option to create a new page, the artist should be redirected to the “page creation” page. 
4. On the “page creation” page, the artist should find fields to enter the name of the page and a short description of their occupation. 
5. After the artist has filled the fields in the “page creation” page, there should be a “create page” button below the input fields. 
6. After choosing the “create page” option, the artist should be redirected to their new page. 
7. After the “create page” option is selected, the application should save the information of the new page and generate a new QR code, containing the link of the new page. 
8. The generated QR code should be sent to the email address of the artist. 

**Feature 3: Donation Process** 

User Story: 

As a viewer, I want to be able to donate to an artist by clicking a “Donate” button on their page and choosing from various payment methods such as IBAN,Stripe,Apple Pay and Google Pay 

**Acceptance Criteria:** 

1. When the viewer scans the QR code with their camera app, they should be redirected to the artist’s page. 
1. On the artist’s page, the viewer should be able to see a prompt to donate. The prompt should be fixed on the page in a way that doesn’t inhibit the user’s experience. 
1. On the artist’s page, the viewer should be able to see the artist’s bio, profile picture and gallery. 
1. Under the artist’s information, the viewer should see an option to donate. 
1. If the viewer selects the option to donate, they should be redirected to the donation page. 
1. On the donation page, the viewer should see different payment options. 
1. After selecting a payment option, the viewer should be redirected to a “payment information” page, where they could enter their payment information. 
1. After entering their payment information, the viewer should be able to see a “Donate” option. 
1. After choosing the “Donate” option, the viewer should be redirected back to the page of the artist. 
2.  The viewer’s donation should be processed and sent to the artist’s Stripe account.

**Feature 4: Artist Payment** 

User story: 

As an artist, i want to be able to receive my donations regularly and reliably through my preferred payment method. 

1. The artist should be able to select their preferred payment service upon signing up. Additionally, with the creation of the artist’s account, the application will create a Stripe connect account dedicated to accumulating the donations intended for the artist. 
1. Upon selecting the edit payment option, the artist should be able to change their payment service or input their preferred date, or amount of time between each donation, for receiving their donations. 
1. On the desired date, the application will forward the accumulated donation from the artist’s Stripe sub-account to the artist’s preferred payment service.  
1. After the successful forwarding of accumulated donations, the application should send an invoice to the artist’s email address.   

**Feature 5: Admin Rights** 

User Story: 

As an admin, I want to be able to moderate the contents of the application. If I see content that does not meet the community guidelines, I want to be able to restrict the user’s rights to their account. 

**Acceptance Criteria:** 

1. The admin should be able to freely view the user’s information. 
1. The admin should have the option to create a ban id that is associated with a user account. 

**Future Features:**  

- Integration with additional payment methods** 
- Social media sharing options for artist pages. 
- Creating viewer/donator accounts. 
- Expanding community moderation options. 

**Platform:**  

QArté will be developed using C#, .NET, Entity framework core, JWT, javascript react, MS SQL, Docker, QR generation API 

**User Interfaces:**  

Users will interact with QArté through a web interface that is suitable for a mobile browser. !

**Authentication:**  

QArté will support authentication through Google and simple registration. **Data sources:**  

Data will be sourced from user input during registration, artist page creation, and donation transactions. 

**Data types:** 

Text, images, QR codes, payment transaction data.** 

**Data Storage:**  

Data will be stored in a database. Artist’s payment information will be securely handled using Stripe. 

**Non-functional requirements:** 

**Performance:**  

QArté should operate efficiently, allowing artists and viewers to access pages and make donations quickly. 

**Scalability:** 

QArté should be scalable to handle an increasing number of users and artists. 

**Availability:**  

QArté should aim for minimal downtime and strive to always be available                                    

**Security:**  

QArté should ensure the secure handling of user data, access control, and internal data security. 

**Compliance:** 

` `QArté should adhere to privacy, data protection, and confidentiality regulations.   

**Usability:**  

QArté’s interface should be intuitive, meeting user expectations for ease of use. 

**Support and Maintenance:**  

QArté will be updated periodically with new features throughout the development process. 

