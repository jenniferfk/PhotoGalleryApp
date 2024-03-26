# Location-Based Photo Gallery App

PhotoLocationGalleryApp is a React Native application designed to provide users with a seamless experience for capturing, organizing, and viewing photos based on their location.

<img src="https://github.com/jenniferfk/PhotoGalleryApp/assets/121551748/a7bcaaf5-6804-4fdc-9e50-1d7b24ea26aa" width="200">

<img src="https://github.com/jenniferfk/PhotoGalleryApp/assets/121551748/78d1d34e-1133-4242-88bc-1e19bbdeea22" width="200">

<img src="https://github.com/jenniferfk/PhotoGalleryApp/assets/121551748/ac58b05e-9d53-4f34-819a-1fd2f5959ae0" width="200">

<img src="https://github.com/jenniferfk/PhotoGalleryApp/assets/121551748/62bb9885-40b2-47b4-b11d-531c26553902" width="200">

<img src="https://github.com/jenniferfk/PhotoGalleryApp/assets/121551748/6b1f0b73-7040-43af-a93d-b4016025d24a" width="200">

<img src="https://github.com/jenniferfk/PhotoGalleryApp/assets/121551748/e74cc5ea-6805-4b10-b121-2d67b1c3b172" width="200"> 

<img src="https://github.com/jenniferfk/PhotoGalleryApp/assets/121551748/bd27a9c7-0826-409b-8c57-770e8ec70d16" width="200">

<img src="https://github.com/jenniferfk/PhotoGalleryApp/assets/121551748/fa4710c6-4259-4f6c-b180-c5970c06d87c" width="200">

## Description: 
- Camera Screen : User can capture an image after giving permission to the camera usage. when the photo is taken, its location is put in a mock api. (for unknown reasons, the location on first 1-2 tries is undefined then it gets stored perfectly)
- Photos Screen : Screen displaying all taken photos with the ability to long press on one to delete and press on it to view details.
- Details Screen : Displays the image selected with a map and a marker based on where the photo was taken. And a button giving the ability to user to put a photo as favorite
- Maps Screen: Displaying the Map with a marker (containing images filtered by location) on which we can click to view all images taken in that location. A number is put on that marker to know how many images are inside that location.
- Screen to view the selected images from maps, filtered by the location. 
- Favorites Screen: Containing all the favorite photos. 
When a photo is deleted from the photos screen, it gets deleted fromm all screens including the favorite screen

I used Mock API to store images with their location and id. 
I used AsyncStorage to store favorite images. 
Animation for transitioning between screens is also added. 
