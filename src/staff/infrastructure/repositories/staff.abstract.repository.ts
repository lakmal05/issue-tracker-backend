export abstract class StaffAbstractRepository {
  abstract findAll();

  // abstract create(data);

  abstract findOne(staffId: string);

  // abstract changeStatus();

  abstract update(staffId: string, data: any);
}
