import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const materialController = {
  async getmaterials(req, res, next) {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Unauthorized. Please log in." });
      }

      const { classId, subjectId } = req.query;

      if (!classId || !subjectId) {
        return res
          .status(400)
          .json({ message: "both class and subject is required." });
      }

      const materials = await prisma.material.findMany({
        where: {
          classId,
          subjectId,
        },
      });

      if (!materials || materials.length === 0) {
        return res
          .status(404)
          .json({ message: "No materials found for the specified criteria." });
      }

      res.json(customResponse(200, materials));
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async createMaterialsMentor(req, res, next) {
    try {
      const { title, content, classname, subjectname } = req.body;

      let classRecord = await prisma.class.findFirst({
        where: {
          name: classname,
        },
      });

      if (!classRecord) {
        classRecord = await prisma.class.create({
          data: {
            name: classname,
          },
        });
      }

      let subjectRecord = await prisma.subject.findFirst({
        where: {
          name: subjectname,
          classId: classRecord.id,
        },
      });
      if (!subjectRecord) {
        subjectRecord = await prisma.subject.create({
          data: {
            name: subjectname,
            classId: classRecord.id,
            // Add any other subject-related fields here
          },
        });
      }
      let newMaterial = null;

      if (subjectRecord && classRecord) {
        newMaterial = await prisma.material.create({
          data: {
            userId: req.user.id,
            subjectId: subjectRecord.id,
            classId: classRecord.id,
            content: content,
            title: title,
          },
        });
      } else {
        // Handle the case where either subjectRecord or classRecord is not found.
        res.json({
          success: false,
          message: "Subject or class not found",
        });
        return;
      }

      res.json({
        success: true,
        message: newMaterial,
      });

      console.log("Material created:", newMaterial);
    } catch (err) {
      console.error("Error creating material:", err);
      res.json({
        success: false,
        message: err,
      });
    }
  },
  async getMaterialByClass(req, res, next) {
    try {
      const { classname, subjectName } = req.body;
      const findclassId = await prisma.class.findFirst({
        where: {
          name: classname,
        },
      });

      console.log(findclassId, "class ID");
      let materials = [];

      if (findclassId) {
        // Modify the query to filter by subject
        materials = await prisma.material.findMany({
          where: {
            classId: findclassId.id,
            subject: {
              name: subjectName, // Filter by subject name
            },
          },
          include: {
            subject: true,
            owner: true,
          },
        });
        console.log(materials);
      }

      if (materials && materials.length > 0) {
        res.json({
          success: true,
          message: materials,
        });
      } else {
        res.json({
          success: false,
          message: "No materials found for the given class and subject.",
        });
      }
    } catch (err) {
      console.log(err);
      res.json({
        success: false,
        message: err,
      });
    }
  },
  async getallSubjects(req, res, next) {
    try {
      const { classname } = req.body;
      const findclassId = await prisma.class.findFirst({
        where: {
          name: classname,
        },
      });
      let subjects = [];
      if (findclassId) {
        subjects = await prisma.subject.findMany({
          where: {
            classId: findclassId.id,
          },
        });
        res.json({
          success: true,
          message: subjects,
        });
      }
    } catch (err) {
      console.log(err);
      res.json({
        success: true,
        message: err,
      });
    }
  },
};

export default materialController;
