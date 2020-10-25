// import React from "react";
// import { useParams, NavLink } from "react-router-dom";

// const categories = [
//   { id: 0, title: "Cat 01", subcategory: [1, 2, 3, 4] },
//   { id: 1, title: "Cat 02", subcategory: [2] },
//   { id: 2, title: "Cat 03", subcategory: [3] },
//   { id: 3, title: "Cat 04", subcategory: [4] },
//   { id: 4, title: "Cat 05", subcategory: [5] },
//   { id: 5, title: "Cat 06", subcategory: [] },
// ];
// const Category = ({ match }) => {
//   const category = categories.find((category) => {
//     return parseInt(match.params.catId) === category.id;
//   });
//   return (
//     <div>
//       {match.isExact && (
//         <div>
//           <h1>{category.title}</h1>
//           {category.subcategories.map((subCategoryId) => {
//             return (
//               <div key={subCategoryId}>
//                 <NavLink to={`${match.url}/${subCategoryId}`}>
//                   {categories.find((cat) => cat.id === subCategoryId).title}
//                 </NavLink>
//               </div>
//             );
//           })}
//           {category.id === 7 && (
//             <img alt="cat" src="https://cataas.com/cat"></img>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;
