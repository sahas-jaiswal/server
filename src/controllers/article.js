const slugify = require('slugify');
const db = require('../models');
const fs = require('fs');
const Article = db.article;
const path = require('path')

exports.createArticle = async (req, res) => {
  
  //let articlePictures;

  const { title, desc, state, dist, block, category } = req.body;

  const artobj = {
     title,
    desc,
    state,
    dist,
    block,
    createdBy: req.user.id,
    category
  }

   if (req.files !== null) {
    artobj.articlePictures = req.files.map((file) => {
      return { articlePictures: file.path.replace(/\\/g,'/') };
    });
  }
 
  await Article.create(artobj).then(article => {
    if (article) {
      res.status(200).json({ message: "Article created successfully", article });
    } else {
      res.status(400).json({ message: "This article can't be created." });
    }
  }).catch(err => {
    res.status(500).send(err);
  });
};

exports.getArticle = async (req, res) => {
  await Article.findAll().then(article => {
    if (article) {
      res.status(200).json({ article });
    } else {
      res.status(400).json({ message: "Couldn't find data" });
    }
  }).catch(error => {
    res.status(500).json(error);
  });
};

exports.deleteArticle = async (req, res) => {
  await Article.findOne({ where: { id: req.params.id } }).then(data => {
    if (data) {
      if (data.articlePictures !== null) {
             for (var i = 0; i < data.articlePictures.length; i++)
              {
                  var link = data.articlePictures[i].articlePictures;
                  fs.unlink(link, (err) => {
                  if (err) {
                    console.error(err)
                    return
                  }else{ console.log("file Deleted"); }
                    
                })
              }
          }
         
      Article.destroy({ where: { id: req.params.id } }).then(data => {
        if (data) {
          res.status(200).json({ message: 'Article deleted successfull.'});
        } else {
          res.status(400).json({ message: 'Some error cannot delete', error});
        }
      })
    } else {
      res.status(400).json({message:'Article not found'});
    }
  }).catch(err => {
    res.status(500).send(err);
  });
};


exports.updateArticle = async (req, res) => {

  
  
  const { title, desc, state, dist, block, category } = req.body;

               const artobj = {
                  title,
                  desc,
                  state,
                  dist,
                  block,
                  createdBy: req.user.id,
                  category,
                  };
  
  console.log(req.body);

  await Article.findOne({ where: { id: req.params.id } }).then(data => {
    if (data) {
    
          if (req.files !== null)
          {
                for (var i = 0; i < data.articlePictures.length; i++)
                  {
                      var link = data.articlePictures[i].articlePictures;
                      fs.unlink(link, (err) => {
                      if (err) {
                        console.error(err)
                        return
                      }else{ console.log("file Deleted"); }
                        
                    })
                  }
                artobj.articlePictures = req.files.map((file) => {
                  return { articlePictures: file.path.replace(/\\/g,'/') };
                  });
               
          }else{
            artobj.articlePictures = data.articlePictures;
          }
          
          
          Article.update( artobj, { where: { id: req.params.id } }).then(article => {
            if (article) {
              res.status(200).json({ message: 'Article updated successfull.', article });
            } else {
              res.status(400).json({ message: 'Some error, cannot update', error});
            }
          });
    } else {
      res.status(400).json({message:'Article not found'});
    }
  }).catch(err => {
    res.status(500).json({ err });
  });
};