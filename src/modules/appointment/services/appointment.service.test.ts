import { mapToScheduledAppointment } from "../mappers";
import { IAppointmentRepository } from "../repositories/appointment.repository";
import { AppointmentService } from "./appointment.service";
import {
  appointmentData,
  appointmentResponse,
  appointmentResponses,
} from "../_mocks_/appointment.mocks";

describe("Appointment Service", () => {
  let mockRepo: IAppointmentRepository;
  let appointmentService: AppointmentService;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      read: jest.fn(),
      update: jest.fn(),
      show: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
    };

    appointmentService = new AppointmentService(mockRepo);
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  it("should create an appointment successfully", async () => {
    (mockRepo.create as jest.Mock).mockResolvedValue(appointmentResponse);

    const mappedAppointment = mapToScheduledAppointment(appointmentData);
    const result = await appointmentService.create(mappedAppointment);

    expect(mockRepo.create).toHaveBeenCalledWith(mappedAppointment);
    expect(result).toEqual(appointmentResponse);
  });

  it("should read appointments successfully", async () => {
    (mockRepo.read as jest.Mock).mockResolvedValue(appointmentResponses);

    const psychologistId = "e497d9ce-2614-453b-baca-4292dfdea031";
    const result = await appointmentService.read(psychologistId);

    expect(mockRepo.read).toHaveBeenCalledWith(psychologistId);
    expect(result).toEqual(appointmentResponses);
  });

  it("should update an appointment successfully", async () => {
    (mockRepo.update as jest.Mock).mockResolvedValue(appointmentResponse);

    const result = await appointmentService.update("uuid-123", appointmentData);

    expect(mockRepo.update).toHaveBeenCalledWith("uuid-123", appointmentData);
    expect(result).toEqual(appointmentResponse);
  });

  it("should delete an appointment successfully", async () => {
    (mockRepo.delete as jest.Mock).mockResolvedValue(undefined);

    await appointmentService.delete("uuid-123");
    expect(mockRepo.delete).toHaveBeenCalledWith("uuid-123");
  });
});
