import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const materialController = {
  async getmaterials(req, res, next) {
    try {
     if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
      }
     

      const { classId, subjectId } = req.query;

     
      if (!classId||!subjectId) {
        return res.status(400).json({ message: 'both class and subject is required.' });
      }
      
      
      const materials = await prisma.material.findMany({
        where: {
          classId,
          subjectId,
        },
      });

      if (!materials || materials.length === 0) {
        return res.status(404).json({ message: 'No materials found for the specified criteria.' });
      }

      res.json(customResponse(200, materials));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

 
};

export default materialController;
