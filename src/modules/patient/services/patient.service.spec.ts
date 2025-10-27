import { CreatePatientDTO } from "../dtos/create-patient.dto";
import { IPatientRepository } from "../repositories/patient.repository";
import { PatientService } from "./patient.service";

function makePatient(): CreatePatientDTO {
  return {
    psychologistId: "1",
    name: "Rodrigo César",
    email: "rodrigo@exemplo.com",
    birthDate: "1985-05-01",
    phone: "(11) 99999-0000",
    cpf: "11122233344",
    rg: "0928901564",
  };
}

describe("PatientService", () => {
  let mockPatientRepository: IPatientRepository;
  let patientService: PatientService;

  beforeEach(() => {
    mockPatientRepository = {
      create: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      show: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
    };

    patientService = new PatientService(mockPatientRepository);
  });

  describe("create", () => {
    it("should create a patient successfully", async () => {
      const patientData = makePatient();
      const expectedPatient = { id: "uuid-123", ...patientData };

      (mockPatientRepository.create as jest.Mock).mockResolvedValue(
        expectedPatient
      );

      const result = await patientService.create(patientData);

      expect(mockPatientRepository.create).toHaveBeenCalledWith(patientData);
      expect(result).toEqual(expectedPatient);
    });
  });

  describe("read", () => {
    it("should return all paient successfully", async () => {
      const patientData = makePatient();
      const expectedPatients = [
        { id: "uuid-123", ...patientData },
        { id: "uuid-456", ...patientData },
      ];

      (mockPatientRepository.read as jest.Mock).mockResolvedValue(
        expectedPatients
      );
      const psychologistId = "e497d9ce-2614-453b-baca-4292dfdea031";
      const result = await patientService.read(psychologistId);

      expect(mockPatientRepository.read).toHaveBeenCalled();
      expect(result).toEqual(expectedPatients);
    });
  });

  describe("update", () => {
    it("should update patient successfully", async () => {
      const patientData = makePatient();
      const expectedPatient = [{ id: "uuid-123", ...patientData }];

      (mockPatientRepository.update as jest.Mock).mockResolvedValue(
        expectedPatient
      );

      const result = await patientService.update("uuid-123", patientData);

      expect(mockPatientRepository.update).toHaveBeenCalled();
      expect(result).toEqual(expectedPatient);
    });
  });

  describe("delete", () => {
    it("should delete pacient successfully", async () => {
      (mockPatientRepository.delete as jest.Mock).mockResolvedValue(undefined);

      await patientService.delete("uuid-123");

      expect(mockPatientRepository.delete).toHaveBeenCalledWith("uuid-123");
    });
  });

  describe("show", () => {
    it("should return a unique patient successfully", async () => {
      const patientData = makePatient();
      const expectedPatient = [{ id: "uuid-123", ...patientData }];

      (mockPatientRepository.show as jest.Mock).mockResolvedValue(
        expectedPatient
      );

      const result = await patientService.show("uuid-123");

      expect(mockPatientRepository.show).toHaveBeenCalledWith("uuid-123");
      expect(result).toEqual(expectedPatient);
    });
  });
});
