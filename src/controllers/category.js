const { Op } = require('sequelize');
const slugify = require('slugify');
const { user } = require('../models');
const db = require('../models');
const Category = db.category;

function createCategories(categories, parentId = null) {
 
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
 
  for (let cate of category) {
    categoryList.push({
      id: cate.id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate.id),
    });
  }
  return categoryList;

}

exports.addCategory = async (req, res) => {

   const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    createdBy:req.user.id,
  };


  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

 await Category.findOne({where: {name: categoryObj.name}}).then(
   cat=>{
     if(cat){
       res.send({message: "This Category already exists."});
     }else{
         Category.create(categoryObj).then(category => {
          if(category){
            res.status(200).json( {message: "New Category created",category} );
            console.log(category);
          }
          else {
            res.status(400).json({ error });
          }  
        })
     }
   }
 )
.catch(err => {
      res.status(500).send({ message: err });
      console.log(err);
    });
};

exports.allCategory = (req,res) => {
  
  Category.findAll().then(categories => {
        if(categories){
          const categoryList = createCategories(categories);
          res.status(200).json({categoryList});
    }
        if(error) {
          res.status(400).json({ error });
    }
  }).catch(error => {
    res.status(500).send({ error });
    console.log(err);
  });
};


exports.updateCategory = async (req, res) => {

  const nam = req.params.name;
  const categoryObj = {
   name: req.body.name,
   slug: slugify(req.body.name),
   parentId: req.body.parentId,
   createdBy:req.user.id,
 };
 await Category.findOne({where: { name : nam}}).then(data=> {
   if(data.parentId === null){
     Category.update(categoryObj, {where : {name : nam}}).then(data => {
      if(data){
        res.status(200).json({ message: "Category was updated successfully.", data});
      }
    })
   }else{
     res.status(400).json({message: `Cannot find the category name : ${nam}`});
   }
})

.catch(err => {
  res.status(500).send({
    message: `Error updating Category with ${nam} name`,err
  });
});
  
};

exports.deleteCategory = async (req, res) => {
  //const id 
  await Category.findOne({where :{name : req.body.name}})
 .then(cat => {
   if(cat){
      Category.destroy({where : {name : req.body.name}}).then(data=>{
        if(data){
          res.status(200).json({ message: "Category is deleted successfully."});
        }
        else{
          res.status(400).json({error});
        }
      })
    }
   else{
     res.status(400).json({message: "Category of this name does not exist"});
  }
    
})
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Category with id=" 
    });
  });
   
};

exports.deleteAllWithCategory = async (req, res) => {
  
 await Category.findAll({
    where:  { id : req.body.id ,
  parentId: req.body.id }
 })
    .then(data => {
      if (data) {
        res.send({data});
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

