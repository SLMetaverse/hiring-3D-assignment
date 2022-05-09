# 3D Code Exercise

Write a code to meet the following requirements.

- Create 3D rooms. Room is a cube. Must see rooms through the semi-transparent wall. Build a pattern of room as in the image below. ![Cube Image](https://github.com/SLMetaverse/hiring-3D-assignment/blob/challenge/example.jpg?raw=true)

- Wall of a room must be opaque if there is no room next to it. Rooms must be seperated by semi-transparent wall to see the range of rooms.

- Make sure there aren't any roofs parts. We must be able to see down from above (at an angle).

- Make sure when it loads, the camera is at the right perspective. It should be like a drone at certain height in the sky. It should be able to look through the halls from above (at an angle).

- Should be able to view the file in a web browser. It should probably output a file that can be loaded into HTML in 3d. X3DOM, or VRML, or .x3d, etc.

# Notes

- [three.js](https://threejs.org) is a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL.
- There are lots of [examples](https://threejs.org/examples/#webgl_animation_keyframes) that can be referenced.
- You are free to use, write your code in any framework.
- Your code should run and should able to see the desired output in 3D view.

# Instructions

1. Fork the repository.

2. Create a seperate file for the assignment.

3. Push your branch and create a pull request on GitHub.

4. `example.html` is one example for reference done with three.js.

5. Feel free to add your own elements for extra credit but must not deviate from the requirements mentioned above.

## References

- [Pkg](https://unpkg.com/browse/three@0.138.3/)
- [GitHub](https://github.com/mrdoob/three.js)
- [3D transformations](https://www.cs.cornell.edu/courses/cs4620/2010fa/lectures/03transforms3d.pdf)
- https://redstapler.co/add-3d-model-to-website-threejs/

- https://www.argyllcms.com/doc/3dformat.html

- https://www.vectary.com/3d-modeling-blog/3d-web-embed-guide

- https://medium.com/samsung-internet-dev/adding-3d-models-to-your-website-d374a8cbbadd

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```
