import { loadFilesSync } from '@graphql-tools/load-files'
import { join } from 'path'
import graphQLLetConfig from '../../../.graphql-let.yml'
import { mergeTypeDefs } from '@graphql-tools/merge'

const loadedFiles = loadFilesSync(join(process.cwd(), graphQLLetConfig.schema))
const typeDefs = mergeTypeDefs(loadedFiles)

export default typeDefs
