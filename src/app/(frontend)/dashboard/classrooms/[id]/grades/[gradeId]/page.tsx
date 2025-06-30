import { getSubmissionByID } from "../_actions/getSubmissionByID"
import { GradeDetail } from "./_components/GradeDetail"


export default async function Page({ params }: { params: { gradeId: string } }) {
  const submission = await getSubmissionByID(params.gradeId)

  return <GradeDetail submission={submission} />
}
