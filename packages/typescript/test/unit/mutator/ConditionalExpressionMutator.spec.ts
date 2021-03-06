import ConditionalExpressionMutator from '../../../src/mutator/ConditionalExpressionMutator';
import { verifySpecification } from './mutatorAssertions';
import ConditionalExpressionMutatorSpec from '@stryker-mutator/mutator-specification/src/ConditionalExpressionMutatorSpec';

verifySpecification(ConditionalExpressionMutatorSpec, ConditionalExpressionMutator);
