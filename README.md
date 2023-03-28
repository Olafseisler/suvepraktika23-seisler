CGI Summer Internship

This is my take at implementing the required tasks for the summer internship application assingment.

At first glance all the tasks seemed conceptually simple, albeit I was a little confused that the internship ad asked for Java knowledge, whilst most if not all of the assignment was about fleshing out a frontend for a web app. Problem was that I didn’t know any Angular. Nor the Spring backend for that matter. 

I found most challenging integrating the existing code with the way Angular does things.
I have some experience with Vue, which made understanding the code somewhat simpler. However, 
every JS framework has its own syntax and finding out what works under which condition takes some time.

I started off by building a simple book info view page, mostly following the style of the existing components. Adding new pages and connecting them via routes was easy, but more dynamic components like the sortable, filterable list took some research.


I focused on making the UI as minimalistic as possible. The app is no-frills basic so the UI should reflect that and not confuse the user. A navbar at the top, a couple lists and a book entry form should suffice. Ideally there would be an account system that would show the checkout
data and favorites for each user, but building while just learning Angular and Spring seemed too ambitious considering the deadline. 

Communicating with the backend was a challenge of its own. The Spring-based server still confuses me. It seems like a huge mess - abstraction upon abstraction, following references and class relationships often led me nowhere. 
Thankfully most of the API endpoints worked and I just had to figure out how to correctly use asycnhronous calls to these methods.

Despite problems with getting started in Angular, the framework is surprisingly intuitive and offers ways to get things done with fewer layers
of indirection than Vue. Spring seems far more alien and I have a lot to learn before I feel ready to dive into that.

Overall the project lacks some finish but since it covers all but one of the necessary functionalities I still consider it a success.

I had a lot of help from the following tutorials:
https://www.youtube.com/watch?v=itq4KHN8buM&t=195s
https://www.youtube.com/watch?v=Np3ULAMqwNo
