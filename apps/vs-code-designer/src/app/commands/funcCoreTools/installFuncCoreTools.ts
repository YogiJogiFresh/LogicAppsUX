/*------------------p---------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Platform, dependenciesPathSettingKey } from '../../../constants';
import { ext } from '../../../extensionVariables';
import {
  downloadAndExtractBinaries,
  getCpuArchitecture,
  getFunctionCoreToolsBinariesReleaseUrl,
  getNewestFunctionRuntimeVersion,
} from '../../utils/binaries';
import { getGlobalSetting } from '../../utils/vsCodeConfig/settings';
import type { IActionContext } from '@microsoft/vscode-azext-utils';

export async function installFuncCoreTools(context: IActionContext, targetDirectory?: string): Promise<void> {
  ext.outputChannel.show();
  const arch = getCpuArchitecture();

  if (!targetDirectory) {
    targetDirectory = getGlobalSetting<string>(dependenciesPathSettingKey);
  }

  const version = getNewestFunctionRuntimeVersion(context);
  let azureFunctionCoreToolsReleasesUrl;

  switch (process.platform) {
    case Platform.windows:
      azureFunctionCoreToolsReleasesUrl = getFunctionCoreToolsBinariesReleaseUrl(version, 'win', arch);
      break;

    case Platform.linux:
      azureFunctionCoreToolsReleasesUrl = getFunctionCoreToolsBinariesReleaseUrl(version, 'linux', arch);
      break;

    case Platform.mac:
      azureFunctionCoreToolsReleasesUrl = getFunctionCoreToolsBinariesReleaseUrl(version, 'osx', arch);
      break;
  }
  downloadAndExtractBinaries(context, azureFunctionCoreToolsReleasesUrl, targetDirectory, 'FuncCoreTools');
}
